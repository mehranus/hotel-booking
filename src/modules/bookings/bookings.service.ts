import { BadRequestException, ConflictException, Inject, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entity/booking.entity';
import { DataSource, Repository } from 'typeorm';
import { RoomsEntity } from '../rooms/entity/rooms.entity';
import { CreateBookingDto } from './dto/booking.dto';
import { BookingType } from 'src/common/enums/booking.enum';
import Redis from 'ioredis';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingEntity) private readonly bookingRepository:Repository<BookingEntity>,
    @InjectRepository(RoomsEntity) private readonly roomRepository:Repository<RoomsEntity>,
    private dataSourec:DataSource,
    @Inject('REDIS_CLIENT') private redis:Redis
){}


 async acquireLock(key: string, ttl = 5): Promise<boolean> {
  const result = await this.redis.set(key, 'locked', 'EX', ttl, 'NX');
  return result === 'OK';
}

async releseLock(key:string){
  await this.redis.del(key)
}



  async create(userId:number,dto:CreateBookingDto){
    const lockKey=`lock:room${dto.roomId}:${dto.checkIn}:${dto.checkOut}`
    const lockAcquired =await this.acquireLock(lockKey,5)
    if(!lockAcquired){
      throw new ConflictException('Another booking is in progress')
    }
    try{

    
   return await this.dataSourec.transaction(
      'SERIALIZABLE',
      async (manger)=>{
        if(dto.checkIn >= dto.checkOut){
        throw new BadRequestException('Invalid date reing')
      }
        const overlap= await manger.createQueryBuilder(BookingEntity,'booking')
        .where('booking.roomId= :roomId',{roomId:dto.roomId})
        .andWhere('booking.status= :status',{status:'CONFIRMED'})
        .andWhere('NOT(booking.checkOut <= :checkIn OR booking.checkIn >= :checkOut)',{checkIn:dto.checkIn,checkOut:dto.checkOut})
        .getOne();

        if(overlap){
        throw new ConflictException('Room is not available')
        }

        const booking= manger.create(BookingEntity,{
          user:{id:userId},
          room:{id:dto.roomId},
          checkIn:dto.checkIn,
          checkOut:dto.checkOut,
        });

        return manger.save(booking)
          }
          
    )} finally{
      await this.releseLock(lockKey)
    }
  
  

  


  }

  findUserBooking(userId:number){
    return this.bookingRepository.find({
      where:{user:{id:userId}},
      relations:['room','room.hotel']
    })
  }

  async cancel(id:number,userId:number){
    const booking=await this.bookingRepository.findOne({where:{id},relations:['user']})

    if(!booking || booking.user.id !== userId){
      throw new NotFoundException()
    }

    booking.status=BookingType.CANCELED
    return this.bookingRepository.save(booking)
  }

}

import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entity/booking.entity';
import { DataSource, Repository } from 'typeorm';
import { RoomsEntity } from '../rooms/entity/rooms.entity';
import { CreateBookingDto } from './dto/booking.dto';
import { BookingType } from 'src/common/enums/booking.enum';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingEntity) private readonly bookingRepository:Repository<BookingEntity>,
    @InjectRepository(RoomsEntity) private readonly roomRepository:Repository<RoomsEntity>,
    private dataSourec:DataSource
){}

  async create(userId:number,dto:CreateBookingDto){
   return this.dataSourec.transaction(
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
    )
  
  

  


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

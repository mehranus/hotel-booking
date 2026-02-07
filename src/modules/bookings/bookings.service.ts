import { BadRequestException, ConflictException, Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { BookingEntity } from './entity/booking.entity';
import { Repository } from 'typeorm';
import { RoomsEntity } from '../rooms/entity/rooms.entity';
import { CreateBookingDto } from './dto/booking.dto';
import { BookingType } from 'src/common/enums/booking.enum';

@Injectable()
export class BookingsService {
  constructor(
    @InjectRepository(BookingEntity) private readonly bookingRepository:Repository<BookingEntity>,
    @InjectRepository(RoomsEntity) private readonly roomRepository:Repository<RoomsEntity>
){}

  async create(userId:number,dto:CreateBookingDto){
    if(dto.checkIn >= dto.checkOut){
      throw new BadRequestException('Invalid date reing')
    }
    const room=await this.roomRepository.findOne({where:{id:dto.roomId}})

    if(!room){
      throw new BadRequestException('room not find')
    }

    const overlap= await this.bookingRepository.createQueryBuilder('booking')
    .where('booking.roomId= :roomId',{roomId:dto.roomId})
    .andWhere('booking.status= :status',{status:'CONFIRMED'})
    .andWhere('NOT(booking.checkOut <= :checkIn OR booking.checkIn >= :checkOut',{checkIn:dto.checkIn,checkOut:dto.checkOut})
    .getOne();

    if(overlap){
      throw new ConflictException('Room is not available')
    }

    const booking= this.bookingRepository.create({
      user:{id:userId},
      room,
      checkIn:dto.checkIn,
      checkOut:dto.checkOut
    })
    return this.bookingRepository.save(booking)


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

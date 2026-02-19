import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from '../hotels/entity/hotel.entity';
import { Repository } from 'typeorm';
import { RoomsEntity } from './entity/rooms.entity';
import Redis from 'ioredis';

@Injectable()
export class RoomsService {
   constructor(
      @InjectRepository(HotelEntity) private readonly hotelRepository:Repository<HotelEntity>,
      @InjectRepository(RoomsEntity) private readonly roomsRepository:Repository<RoomsEntity>,
      @Inject('REDIS_CLIENT') private readonly redis:Redis
    ){}

    async create(hotelId:number,data:Partial<RoomsEntity>){
      const hotel=await this.hotelRepository.findOne({where:{id:hotelId}})
      if(!hotel) throw new UnauthorizedException()
       
        return this.roomsRepository.save({...data,hotel})
    }

    findByHotel(hotelId:number){
      return this.roomsRepository.find({where:{id:hotelId},relations:['hotel']})
    }


    async findAvalilable(checkIn:string,checkOut:string){
      const cashKey= `avalilable:${checkIn}:${checkOut}`
      const cached=await this.redis.get(cashKey)
      if(cached){
        return JSON.parse(cached)
      }

      const room=await this.roomsRepository.createQueryBuilder('room')
      .leftJoin(
        'room.bookings',
        'booking',
        `booking.status =:status
        AND NOT(
        booking.checkOut <= :checkIn
        OR booking.checkIn >= :checkOut)`,
        {
          status:'CONFIRMED',
          checkIn,
          checkOut
        }
      )
      .where('booking.id IS NULL')
      .getMany();
      await this.redis.set(cashKey,JSON.stringify(room),'EX',30)
      return room;
    }
}

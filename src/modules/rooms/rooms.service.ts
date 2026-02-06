import { Injectable, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from '../hotels/entity/hotel.entity';
import { Repository } from 'typeorm';
import { RoomsEntity } from './entity/rooms.entity';

@Injectable()
export class RoomsService {
   constructor(
      @InjectRepository(HotelEntity) private readonly hotelRepository:Repository<HotelEntity>,
      @InjectRepository(RoomsEntity) private readonly roomsRepository:Repository<RoomsEntity>
    ){}

    async create(hotelId:number,data:Partial<RoomsEntity>){
      const hotel=await this.hotelRepository.findOne({where:{id:hotelId}})
      if(!hotel) throw new UnauthorizedException()
       
        return this.roomsRepository.save({...data,hotel})
    }

    findByHotel(hotelId:number){
      return this.roomsRepository.find({where:{id:hotelId},relations:['hotel']})
    }
}

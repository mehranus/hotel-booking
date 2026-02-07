import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { HotelEntity } from './entity/hotel.entity';
import { Repository } from 'typeorm';

@Injectable()
export class HotelsService {

  constructor(
    @InjectRepository(HotelEntity) private readonly hotelRepository:Repository<HotelEntity>
  ){}

  create(data:Partial<HotelEntity>){
    console.log(data)
    return this.hotelRepository.save(data)
  }
 
  findAll(){
    return this.hotelRepository.find()
  }

  findOne(id:number){
    return this.hotelRepository.findOne({where:{id}})
  }

}

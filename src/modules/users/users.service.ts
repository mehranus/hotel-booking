import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { UserEntity } from './entity/user.entity';
import { Repository } from 'typeorm';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(UserEntity)  private readonly userEntity:Repository<UserEntity>
  ){}

  findByEmail(email:string){
    return this.userEntity.findOne({where:{email}})
  }

  create(user:UserEntity){
    return this.userEntity.save(user)
  }

  findById(id:number){
    return this.userEntity.findOne({where:{id}})
  }
  
}

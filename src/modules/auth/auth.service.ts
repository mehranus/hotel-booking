import { Injectable, UnauthorizedException } from '@nestjs/common';
import { UsersService } from '../users/users.service';
import { JwtService } from '@nestjs/jwt';
import * as bcrypt from 'bcrypt'


@Injectable()
export class AuthService {

  constructor(
    private userService:UsersService,
    private jwtService:JwtService
  ){}

  async register(email:string,password:string){
    const hashed=await bcrypt.hash(password,10);
    const user= await this.userService.create({email,password:hashed})
    return user
  }

  async login(email:string,password:string){
    const user =await this.userService.findByEmail(email)
    if(!user) throw new UnauthorizedException();
    const valid= await bcrypt.compare(password,user.password)
    if(!valid) throw new UnauthorizedException();

    const payload={
      sub:user.id,
      role:user.role
    }

    return{
      access_token: this.jwtService.sign(payload)
    }
 
  }
}

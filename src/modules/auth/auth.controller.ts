import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';
import { RegisterDto } from './dto/register.dto';
import { LoginDto } from './dto/login.dto';

@Controller('auth')
export class AuthController {
  constructor(
    private authServce:AuthService
  ){}
  
  @Post("register")
  register(@Body() dto:RegisterDto){
    return this.authServce.register(dto.email,dto.password)
  }
  @Post("login")
  login(@Body() dto:LoginDto){
    return this.authServce.login(dto.email,dto.password)
  }
}

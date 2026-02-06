import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import {  CreateHotelDto } from './dto/hotel.dto';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Role } from 'src/common/enums/role.enum';
import { Roles } from 'src/common/decorators/role.decorator';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';

@ApiTags('Hotels')
@Controller('hotels')
export class HotelsController {

  constructor(
    private hotelService:HotelsService
  ){}

  @Get()
  findAll(){
    return this.hotelService.findAll()
  }

  @Get(':id')
  findOne(@Param('id') id:number){
    return this.hotelService.findOne(id)
  }
  
  @ApiBearerAuth()
  @Post()
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Roles(Role.ADMIN)
  create(@Body() crateDto:CreateHotelDto){
    return this.hotelService.create(crateDto)
  }
}

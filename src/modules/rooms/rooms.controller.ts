import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';
import { RoleGuard } from 'src/common/guards/roles.guard';
import { Roles } from 'src/common/decorators/role.decorator';
import { Role } from 'src/common/enums/role.enum';
import { CreateRoomDto } from './dto/rooms.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { AuthDecorator } from 'src/common/decorators/auth.decorator';

@ApiTags('Rooms')

@Controller('hotels/:hotelId/rooms')
export class RoomsController {
  constructor(
    private roomsService:RoomsService
  ){}

  @Get()
  find(@Param('hotelId') hotelId:number){
    return this.roomsService.findByHotel(hotelId)
  }

  @Post()
  @ApiBearerAuth('Authuriztion')
  @UseGuards(JwtAuthGuard,RoleGuard)
  @Roles(Role.ADMIN)
  create(@Param('hotelId') hotelId:number,@Body() roomsDto:CreateRoomDto ){
    return this.roomsService.create(hotelId,roomsDto)
  }
}

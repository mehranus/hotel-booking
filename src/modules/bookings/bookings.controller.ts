import { Body, Controller, Delete, Get, Param, Post, Req, UseGuards } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { CreateBookingDto } from './dto/booking.dto';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { JwtAuthGuard } from 'src/common/guards/jwt-auth.guard';

@ApiTags('Booking')
@ApiBearerAuth('Authuriztion')
@UseGuards(JwtAuthGuard)
@Controller('bookings')
export class BookingsController {

  constructor(
    private bookingService:BookingsService
  ){}

  @Post()
  craeteBokking(@Req() req , @Body() dto:CreateBookingDto){
    return this.bookingService.create(req.user.userId,dto)
  }

  @Get('me')
  findMyBooking(@Req() req){
   return this.bookingService.findUserBooking(req.user.userId)
  }

  @Delete(':id')
  cancel(@Param("id") id:number,@Req() req){
    return this.bookingService.cancel(id,req.user.userId)
  }



}

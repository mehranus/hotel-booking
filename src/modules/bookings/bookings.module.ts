import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entity/booking.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BookingEntity])],
  providers: [BookingsService],
  controllers: [BookingsController]
})
export class BookingsModule {}

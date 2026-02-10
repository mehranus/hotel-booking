import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entity/booking.entity';
import { RoomsEntity } from '../rooms/entity/rooms.entity';

@Module({
  imports:[TypeOrmModule.forFeature([BookingEntity,RoomsEntity])],
  providers: [BookingsService],
  controllers: [BookingsController]
})
export class BookingsModule {}

import { Module } from '@nestjs/common';
import { BookingsService } from './bookings.service';
import { BookingsController } from './bookings.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BookingEntity } from './entity/booking.entity';
import { RoomsEntity } from '../rooms/entity/rooms.entity';
import { RedisModule } from 'src/common/redis/redis.module';
import { RabbitmqModule } from 'src/common/rabbitmq/rabbitmq.module';
import { BookingConsumer } from 'src/consumers/booking.consumer';

@Module({
  imports:[TypeOrmModule.forFeature([BookingEntity,RoomsEntity]),RedisModule,RabbitmqModule],
  providers: [BookingsService,BookingConsumer],
  controllers: [BookingsController],

})
export class BookingsModule {}

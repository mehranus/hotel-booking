import { Module } from '@nestjs/common';
import { RoomsService } from './rooms.service';
import { RoomsController } from './rooms.controller';
import { RoomsEntity } from './entity/rooms.entity';
import { HotelEntity } from '../hotels/entity/hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { RedisModule } from 'src/common/redis/redis.module';

@Module({
  imports:[TypeOrmModule.forFeature([RoomsEntity,HotelEntity]),RedisModule],
  providers: [RoomsService],
  controllers: [RoomsController]
})
export class RoomsModule {}

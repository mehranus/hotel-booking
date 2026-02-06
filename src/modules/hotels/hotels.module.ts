import { Module } from '@nestjs/common';
import { HotelsService } from './hotels.service';
import { HotelsController } from './hotels.controller';
import { HotelEntity } from './entity/hotel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports:[TypeOrmModule.forFeature([HotelEntity])],
  providers: [HotelsService],
  exports:[HotelsService],
  controllers: [HotelsController]
})
export class HotelsModule {}

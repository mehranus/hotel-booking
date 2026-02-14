import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/config/database.confug';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './rooms/rooms.module';
import { BookingsModule } from './bookings/bookings.module';
import { BookingConsumer } from 'src/consumers/booking.consumer';
import { RabbitmqModule } from 'src/common/rabbitmq/rabbitmq.module';
import { ConfigModule } from '@nestjs/config';
import configrition from 'src/config/configrition';
import { join } from 'path';

@Module({
  imports: [
    TypeOrmModule.forRoot(databaseConfig),
    ConfigModule.forRoot({isGlobal:true, load:[configrition]}),
    
     UsersModule, AuthModule, HotelsModule, RoomsModule, BookingsModule,RabbitmqModule],
  controllers: [],
  providers: [BookingConsumer],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { ThrottlerModule } from '@nestjs/throttler';
import { ConfigModule } from '@nestjs/config';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';

import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './rooms/rooms.module';
import { BookingsModule } from './bookings/bookings.module';
import { RabbitmqModule } from 'src/common/rabbitmq/rabbitmq.module';
import { databaseConfig } from 'src/config/database.config';
import { BookingEntity } from './bookings/entity/booking.entity';

@Module({
  imports: [
    // ✅ ساختار جدید Throttler
    ThrottlerModule.forRoot([
      {
        ttl: 60_000, // یعنی 60 ثانیه
        limit: 20,   // حداکثر 20 درخواست در هر 60 ثانیه
      },
    ]),

    // اتصال TypeORM
    TypeOrmModule.forRoot(databaseConfig()),

    // تنظیمات ConfigModule
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: join(process.cwd(), '.env'),
    }),

    UsersModule,
    AuthModule,
    HotelsModule,
    RoomsModule,
    BookingsModule,
    RabbitmqModule,
  ],
})
export class AppModule {}

import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { databaseConfig } from 'src/config/database.confug';
import { UsersModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { HotelsModule } from './hotels/hotels.module';
import { RoomsModule } from './rooms/rooms.module';

@Module({
  imports: [TypeOrmModule.forRoot(databaseConfig), UsersModule, AuthModule, HotelsModule, RoomsModule],
  controllers: [],
  providers: [],
})
export class AppModule {}

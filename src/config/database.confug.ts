import { TypeOrmModuleOptions } from "@nestjs/typeorm";


export const databaseConfig : TypeOrmModuleOptions={
  type:'postgres',
  host:'localhost',
  port:5432,
  username:'postgres',
  password:'root',
  database:'hotel-booking',
  autoLoadEntities:true,
  synchronize:true // just for dev
}
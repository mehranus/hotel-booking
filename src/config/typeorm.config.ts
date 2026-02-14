import { TypeOrmModuleOptions } from "@nestjs/typeorm";

export function typeOrmConfig ():TypeOrmModuleOptions{
  const {DB_HOST,DB_NAME,DB_PASS,DB_PORT,DB_USERNAME}=process.env
  return{
    type:"postgres",
    host:DB_HOST,
    port:parseInt(DB_PORT || '3000',10),
    username:DB_USERNAME,
    password:DB_PASS,
    database:DB_NAME,
    autoLoadEntities:false,
    synchronize:false,
    entities: [
      "dist/**/**/**/*.entity{.ts,.js}",
      "dist/**/**/*.entity{.ts,.js}"
  ],
  }
}
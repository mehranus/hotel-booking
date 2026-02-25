import { TypeOrmModuleOptions } from "@nestjs/typeorm";
import  configDotenv  from "dotenv";

configDotenv.config()


export function databaseConfig():TypeOrmModuleOptions{
  const {DB_HOST,DB_NAME,DB_PASS,DB_PORT,DB_USER}=process.env
  return{
    type:"postgres",
    host:DB_HOST,
    port:DB_PORT,
    username:DB_USER,
    password:DB_PASS,
    database:DB_NAME,
    autoLoadEntities:true,
    synchronize:false,
    entities: [
      "dist/**/**/**/*.entity{.ts,.js}",
      "dist/**/**/*.entity{.ts,.js}"
  ],
}
}
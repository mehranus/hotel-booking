import { Provider } from "@nestjs/common"
import Redis from "ioredis"

export const RedisProvider:Provider={
  provide:'REDIS_CLIENT',
  useFactory:()=>{
    return new Redis({
      host:process.env.REDIS_HOST,
      port:process.env.REDIS_PORT ,
    })
  }
}
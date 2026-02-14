import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import { swagerConfigInit } from './config/swagger.config';
import dontenv from 'dotenv'
import { ConfigService } from '@nestjs/config';




async function bootstrap() {
   dontenv.config()
  const app = await NestFactory.create(AppModule);
     const configService = app.get(ConfigService);
  
  // 2. خواندن پورت از ConfigService (که از فایل کانفیگ شما می‌آید)
  const port = configService.get<number>('port'); 
  console.log(port)
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true
    })
  )
  swagerConfigInit(app)
  await app.listen(process.env.PORT ?? '3000' ,()=>{
    console.log('Run Port!');
    console.log(`swagger: http://localhost:3000/api`);
});
}
bootstrap();

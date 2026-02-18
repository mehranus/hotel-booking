import { NestFactory } from '@nestjs/core';

import { ValidationPipe } from '@nestjs/common';
import { AppModule } from './modules/app.module';
import { swagerConfigInit } from './config/swagger.config';
import helmet from 'helmet';






async function bootstrap() {
 
  
  const app = await NestFactory.create(AppModule);
  app.use(helmet())
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist:true,
      forbidNonWhitelisted:true,
      transform:true
    })
  )
  app.enableCors({
  origin:['http://localhost:3000'],
  credentials:true})
  swagerConfigInit(app)
  await app.listen(process.env.PORT ?? '3000' ,()=>{
    console.log('Run Port!');
    console.log(`swagger: http://localhost:3000/api`);
});
}
bootstrap();

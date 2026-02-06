import { INestApplication } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { SecuritySchemeObject } from "@nestjs/swagger/dist/interfaces/open-api-spec.interface";


export function swagerConfigInit(app:INestApplication):void{
  const document=new DocumentBuilder()
  .setTitle("HotelBooking")
  .setDescription("This project is a backend system for managing hotel room reservations.")
  .setVersion("0.0.1")
  .addBearerAuth(AuthConfigSwagger(),"Authuriztion")
  .build()
  const swaggerDocument=SwaggerModule.createDocument(app,document)
  SwaggerModule.setup('/api',app,swaggerDocument)
}

function AuthConfigSwagger():SecuritySchemeObject{
  return{
  type:"http",
  bearerFormat:"JWT",
  in:"header",
  scheme:"bearer"

  }
}
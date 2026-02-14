import { Provider } from "@nestjs/common";
import * as amqp from 'amqplib';



export const RabitMQProvider:Provider={
  provide:'RABBITMQ_CONNECTION',
  useFactory:async()=>{
    const connection= await amqp.connect(process.env.RABBITMQ_URL);
    return connection;
  }

}
import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import * as amqp from 'amqplib';

@Injectable()
export class RabbitMQService implements OnModuleInit {
  private channel: amqp.Channel;

  constructor(
    @Inject('RABBITMQ_CONNECTION')
    private readonly connection: amqp.Connection,
  ) {}

  async onModuleInit() {
    this.channel = await this.connection.createChannel();
    await this.channel.assertExchange(
      'booking_exchange',
      'topic',
      { durable: true },
    );
  }


  async publish(routingKey:string,message:any){
    this.channel.publish(
      'booking_exchange',
      routingKey,
      Buffer.from(JSON.stringify(message)),
      { persistent: true }
    )
  }
    
  
}

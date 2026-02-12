import { Inject, Injectable, OnModuleInit } from "@nestjs/common";
import * as amqp from 'amqplib';

@Injectable()
export class BookingConsumer implements OnModuleInit {
  constructor(
    @Inject('RABBITMQ_CONNECTION')
    private readonly connection: amqp.Connection,
  ) {}
  async onModuleInit() {
    const channel = await this.connection.createChannel();
    await channel.assertExchange('booking_exchange', 'topic', { durable: true });
    const q = await channel.assertQueue('booking email queue', { exclusive: true });
   await channel.bindQueue(q.queue, 'booking_exchange', 'booking.created');

   channel.consume(q.queue, async (msg) => {
    if(msg){
      const content = JSON.parse(msg.content.toString());
      console.log('📩send email for booking', content);
      channel.ack(msg)
    }
   });
  
}

}
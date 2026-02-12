import { Module } from '@nestjs/common';
import { RabitMQProvider } from './rabbitmq.provider';
import { RabbitMQService } from './rabbitmq.service';

@Module({
  providers: [RabitMQProvider, RabbitMQService],
  exports: [RabbitMQService,'RABBITMQ_CONNECTION']
})
export class RabbitmqModule {}

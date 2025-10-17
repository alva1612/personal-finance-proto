import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { KAFKA_BROKERS } from './environment';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // Start Kafka microservice
  const kafkaMicroservice = app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.KAFKA,
    options: {
      client: {
        brokers: KAFKA_BROKERS,
      },
      consumer: {
        groupId: 'my-consumer-group',
      },
    },
  });
  app.enableCors({
    origin: '*',
    credentials: true,
  });
  // Start both at once
  await app.startAllMicroservices();
  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();

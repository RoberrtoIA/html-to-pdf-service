import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.GRPC,
    options: {
      package: 'htmltopdf',
      protoPath: join(__dirname, '..', 'src', 'protos', 'html-to-pdf.proto'),
      url: 'localhost:50051',
    },
  });
  await app.listen();
}
bootstrap();

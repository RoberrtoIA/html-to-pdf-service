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
      // Límite para el tamaño máximo del mensaje (en bytes)
      maxReceiveMessageLength: 50 * 1024 * 1024, // 50MB, ajusta según sea necesario
      maxSendMessageLength: 50 * 1024 * 1024, // 50MB, ajusta según sea necesario
    },
  });
  await app.listen();
}
bootstrap();

/**
 * This is not a production server yet!
 * This is only a minimal backend to get started.
 */
import {
  FastifyAdapter,
  NestFastifyApplication,
} from '@nestjs/platform-fastify';
import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import fastifyMultipart from '@fastify/multipart';
import { AppModule } from './app/app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
  );

  app.enableShutdownHooks();

  app.register(fastifyMultipart);

  const globalPrefix = 'api';
  app.setGlobalPrefix(globalPrefix);
  app.enableCors();
  const port = process.env.VITE_SERVER_PORT ?? 3000;
  const hostname = process.env.VITE_SERVER_HOSTNAME ?? '';
  await app.listen(port, hostname);
  Logger.log(
    `🚀 Application is running on: http://${hostname}:${port}/${globalPrefix}`,
  );
}

bootstrap();

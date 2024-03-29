import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { CorsOptions } from 'vite';
import process = require('process');

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.useGlobalPipes(new ValidationPipe())
  const corsOptions: CorsOptions = {
    origin: '*',
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true,
    exposedHeaders : ["Authorization"]
  };

  app.enableCors(corsOptions);

  await app.listen(process.env.PORT ? Number(process.env.PORT) : 6642);

}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';

function computePort() {
  const port = process.env.PORT || 3000;
  const url = `${process.env.BASE_URL || 'http://localhost'}:${port}`;

  return { port, url };
}

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const { port, url } = computePort();
  await app.listen(port);
  Logger.debug(`App started and listening on ${url}`, 'NestServer');
}
void bootstrap();

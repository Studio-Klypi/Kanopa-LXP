import { NestFactory, Reflector } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { NestExpressApplication } from '@nestjs/platform-express';
import basicAuth from 'express-basic-auth';
import cookieParser from 'cookie-parser';
import { isAllowedOrigin } from './common/utils/cors.utils';
import { HttpClassSerializerInterceptor } from './common/interceptors/http-class-serializer.interceptor';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { apiReference } from '@scalar/nestjs-api-reference';

function computePort() {
  const port = process.env.PORT || 3000;
  const url = `${process.env.BASE_URL || 'http://localhost'}:${port}`;

  return { port, url };
}

function configApp(app: NestExpressApplication) {
  app.set('query parser', 'extended');
  app.use(cookieParser());
  app.enableCors({
    origin: (origin, cb) => {
      isAllowedOrigin(origin).then((ok) => cb(null, ok), cb);
    },
    credentials: true,
  });
}
function setupReference(app: NestExpressApplication) {
  app.use(
    '/reference',
    basicAuth({
      users: {
        [process.env.DOC_USER as string]: process.env.DOC_PASSWORD as string,
      },
      challenge: true,
    }),
  );

  const documentConfig = new DocumentBuilder()
    .setTitle('Kanopa API Reference')
    .setDescription('Kanopa internal products api.')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, documentConfig);

  app.use('/reference', apiReference({ content: document }));
}

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
    rawBody: true,
  });
  configApp(app);

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.useGlobalInterceptors(
    new HttpClassSerializerInterceptor(app.get(Reflector)),
  );

  setupReference(app);

  const { port, url } = computePort();
  await app.listen(port);
  Logger.debug(`App started and listening on ${url}`, 'NestServer');
}
void bootstrap();

/** @format */

import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { NestExpressApplication } from '@nestjs/platform-express';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as bodyParser from 'body-parser';
import * as dotenv from 'dotenv';
import { AppModule } from './app.module';
dotenv.config({ path: `${process.cwd()}/.${process.env.NODE_ENV || 'staging'}.env` });

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule);

  const options = {
    origin: '*',
    methods: 'GET, HEAD, PUT, PATCH, POST, DELETE',
    preflightContinue: false,
    optionsSuccessStatus: 204,
    credentials: true,
  };

  app.useStaticAssets(`${__dirname}/public`);
  app.use(bodyParser.json({ limit: '50mb' }));
  app.use(bodyParser.urlencoded({ extended: true }));
  //app.use(cors(options))
  app.enableCors(options);

  console.log('[process.env]-bootstrap', process.env.PORT);
  const config = new DocumentBuilder()
    .setTitle('Pools Dashboard Swagger')
    // .addSecurity('ApiAuth', {
    //   type: 'http',
    //   scheme: 'ApiAuth',
    // })
    .addBearerAuth()
    .setDescription('Pools Dashboard API description')
    .setVersion('1.0')
    // .addTag('P')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('docs', app, document);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
    }),
  );
  await app.listen(process.env.PORT);
}
bootstrap();

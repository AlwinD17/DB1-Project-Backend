import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as morgan from 'morgan'
import { CORS } from './common/constants';
import { ValidationPipe } from '@nestjs/common';

import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  // morgan para request logs
  app.use(morgan('dev'));

  app.useGlobalPipes(new ValidationPipe({
    transform: true,
    transformOptions: {
      enableImplicitConversion: true
    },
  }),
 );

  // definir un global prefix
  app.setGlobalPrefix('api/v1');

  app.enableCors(CORS);

  // Configuración de Swagger
  const config = new DocumentBuilder()
    .setTitle('API Documentation')
    .setDescription('The API description')
    .setVersion('1.0')
    .addTag('api')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/docs', app, document);

  // que haga una consulta a mi config service
  const configService = app.get(ConfigService);

  await app.listen(configService.get('PORT'));
  console.log(`Server running on port ${await app.getUrl()}`);
}

bootstrap();

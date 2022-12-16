import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder } from '@nestjs/swagger';
import { SwaggerModule } from '@nestjs/swagger/dist';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './core/http.exception';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /**
   * Route prefix
   *
   */
  app.setGlobalPrefix('api/v1');

  /**
   * Validation Pipe
   *
   */
  app.useGlobalPipes(new ValidationPipe());

  /**
   * Exception
   *
   */
  app.useGlobalFilters(new HttpExceptionFilter());

  const config = new DocumentBuilder()
    .setTitle('City Stores')
    .setDescription('The City Store API description')
    .setVersion('1.0').build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);


  //
  await app.listen(3000);
}
bootstrap();

import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.setGlobalPrefix('api');
  app.useGlobalPipes(new ValidationPipe());

  //Allow to access the api only from localhost:3000
  app.enableCors({
    origin: 'http://localhost:8000',
  });

  //Swagger
  //  ------------------------------------------
  const config = new DocumentBuilder()
    .setTitle('Image Gen Endpoints')
    .setDescription('These are the endpoints for the image generation')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api/swagger/docs', app, document);

  //  ------------------------------------------

  await app.listen(8000);
}
bootstrap();

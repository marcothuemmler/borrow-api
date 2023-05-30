import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';
import { MinioClient, MinioService } from 'nestjs-minio-client';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
      forbidNonWhitelisted: true,
    }),
  );
  const minioClient: MinioClient = app.get(MinioService).client;
  if (!(await minioClient.bucketExists(process.env.MINIO_BUCKET_NAME))) {
    await minioClient.makeBucket(process.env.MINIO_BUCKET_NAME);
  }
  app.enableCors({ origin: process.env.CORS_ORIGIN });
  const config = new DocumentBuilder()
    .setTitle('borrow.app API')
    .setDescription(
      'API for "borrow.app", An Application Developed For The Mobile Application Lecture In Constance University Of Applied Sciences',
    )
    .setVersion('1.0')
    .addBearerAuth()
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);
  await app.listen(process.env.PORT);
}
bootstrap();

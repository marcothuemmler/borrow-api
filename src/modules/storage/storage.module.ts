import { Module } from '@nestjs/common';
import { MinioModule } from 'nestjs-minio-client';
import { StorageService } from './storage.service';

@Module({
  imports: [
    MinioModule.register({
      endPoint: process.env.MINIO_HOST,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    }),
  ],
  providers: [StorageService],
  exports: [StorageService],
})
export class StorageModule {}

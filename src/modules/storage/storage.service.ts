import { Injectable } from '@nestjs/common';
import { MinioService } from 'nestjs-minio-client';
import * as dotenv from 'dotenv';

dotenv.config();

@Injectable()
export class StorageService {
  constructor(private readonly minioService: MinioService) {
    this.makeBucketIfNotExists(process.env.MINIO_BUCKET_NAME).then();
  }

  async makeBucketIfNotExists(bucketName: string) {
    if (!(await this.minioService.client.bucketExists(bucketName))) {
      await this.minioService.client.makeBucket(bucketName);
    }
  }

  async getPresignedUrlIfExists(
    objectName: string,
  ): Promise<string | undefined> {
    try {
      await this.minioService.client.statObject(
        process.env.MINIO_BUCKET_NAME,
        objectName,
      );
      return await this.minioService.client.presignedGetObject(
        process.env.MINIO_BUCKET_NAME,
        objectName,
      );
    } catch (ignored) {}
  }

  async putObject(objectName: string, file: Express.Multer.File) {
    return this.minioService.client.putObject(
      process.env.MINIO_BUCKET_NAME,
      objectName,
      file.buffer,
      file.size,
      { 'content-type': file.mimetype },
    );
  }
}

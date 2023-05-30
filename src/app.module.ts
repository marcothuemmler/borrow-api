import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './models/group/group.module';
import { UserModule } from './models/user/user.module';
import { ItemModule } from './models/item/item.module';
import { CategoryModule } from './models/category/category.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './auth/auth.module';
import { MinioModule } from 'nestjs-minio-client';

@Module({
  imports: [
    ConfigModule.forRoot(),
    GroupModule,
    UserModule,
    ItemModule,
    CategoryModule,
    AutomapperModule.forRoot({ strategyInitializer: classes() }),
    TypeOrmModule.forRoot({
      type: process.env.DB_TYPE,
      host: process.env.PG_HOST,
      port: process.env.PG_PORT,
      username: process.env.PG_USER,
      password: process.env.PG_PASSWORD,
      database: process.env.PG_DB,
      entities: [__dirname + '/**/*.entity{.ts,.js}'],
      synchronize: true,
    }),
    MinioModule.register({
      isGlobal: true,
      endPoint: process.env.MINIO_HOST,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: process.env.MINIO_USE_SSL === 'true',
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    }),
    AuthModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

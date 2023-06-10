import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { GroupModule } from './modules/group/group.module';
import { UserModule } from './modules/user/user.module';
import { ItemModule } from './modules/item/item.module';
import { CategoryModule } from './modules/category/category.module';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AutomapperModule } from '@automapper/nestjs';
import { classes } from '@automapper/classes';
import { AuthModule } from './auth/auth.module';
import { StorageModule } from './modules/storage/storage.module';
import { MessageModule } from './modules/chat/message.module';

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
    StorageModule,
    AuthModule,
    MessageModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

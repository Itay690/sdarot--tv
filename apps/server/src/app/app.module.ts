import { Module } from '@nestjs/common';
import { UsersModule } from '../users/users.module';
import { VideosModule } from '../videos/videos.module';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    MongooseModule.forRoot('mongodb://localhost:27017/videos'),
    UsersModule,
    VideosModule,
  ],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

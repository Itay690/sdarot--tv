import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { VideosController } from './videos.controller';
import { VideosService } from './videos.service';
import { MongooseModule } from '@nestjs/mongoose';
import { FileModel } from './entities/file.entity';

@Module({
  imports: [
    MongooseModule.forFeature([{ name: 'fs.files', schema: FileModel }]),
    PrismaModule,
  ],
  controllers: [VideosController],
  providers: [VideosService],
  exports: [],
})
export class VideosModule {}

import {
  Controller,
  Get,
  Post,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { Express } from 'express';
import 'multer';
import { SdarotService } from './sdarot.service';

@Controller('sdarot')
export class SdarotController {
  constructor(private sdarotService: SdarotService) {}

  @Get()
  findAll() {
    return this.sdarotService.findAll();
  }

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  async upload(@UploadedFile() file: Express.Multer.File) {
    return this.sdarotService.upload(file);
  }
}

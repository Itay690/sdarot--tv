import { Injectable } from '@nestjs/common';
import { Express } from 'express';
import 'multer';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SdarotService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    const shows = this.prisma.shows.findMany();

    return shows;
  }

  upload(file: Express.Multer.File) {
    return console.log(file);
  }
}

import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';

@Injectable()
export class SdarotService {
  constructor(private prisma: PrismaService) {}

  findAll() {
    return [
      { name: 'Vikings', seasons: 7 },
      { name: 'Suits', seasons: 9 },
      { name: 'Family Guy', seasons: 24 },
    ];
  }
}

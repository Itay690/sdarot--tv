import { Module } from '@nestjs/common';
import { PrismaModule } from '../prisma/prisma.module';
import { SdarotController } from './sdarot.controller';
import { SdarotService } from './sdarot.service';

@Module({
  imports: [PrismaModule],
  controllers: [SdarotController],
  providers: [SdarotService],
  exports: [],
})
export class SdarotModule {}

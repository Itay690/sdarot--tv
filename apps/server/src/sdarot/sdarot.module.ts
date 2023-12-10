import { Module } from '@nestjs/common';
import { SdarotController } from './sdarot.controller';
import { SdarotService } from './sdarot.service';

@Module({
  imports: [],
  controllers: [SdarotController],
  providers: [SdarotService],
  exports: [],
})
export class SdarotModule {}

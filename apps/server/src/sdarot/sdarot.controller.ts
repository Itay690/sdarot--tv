import { Controller, Get } from '@nestjs/common';
import { SdarotService } from './sdarot.service';

@Controller('sdarot')
export class SdarotController {
  constructor(private sdarotService: SdarotService) {}

  @Get()
  findAll() {
    return this.sdarotService.findAll();
  }
}

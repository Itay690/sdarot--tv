import { Injectable } from '@nestjs/common';

@Injectable()
export class SdarotService {
  findAll() {
    return [
      { name: 'Vikings', seasons: 7 },
      { name: 'Suits', seasons: 9 },
      { name: 'Family Guy', seasons: 24 },
    ];
  }
}

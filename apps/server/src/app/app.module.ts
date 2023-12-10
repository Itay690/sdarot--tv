import { Module } from '@nestjs/common';
import { SdarotModule } from '../sdarot/sdarot.module';

@Module({
  imports: [SdarotModule],
  controllers: [],
  providers: [],
  exports: [],
})
export class AppModule {}

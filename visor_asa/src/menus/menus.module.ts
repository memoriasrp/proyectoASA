import { Module } from '@nestjs/common';
import { MenusService } from './menus.service';
import { MenusController } from './menus.controller';

@Module({
  controllers: [MenusController],
  exports: [MenusService],
  providers: [MenusService],
})
export class MenusModule { }

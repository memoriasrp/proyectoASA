import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
@Module({
    providers: [UsersService],
    exports: [UsersService], // Muy importante exportarlo aquí
    controllers: [UsersController]
})
export class UsersModule { }
import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DoorController} from "./door.controller";
import { HttpModule } from '@nestjs/axios';
import {Day2Controller} from "./day2.controller";
import {Day3Controller} from "./day3.controller";

@Module({
  imports: [HttpModule],
  controllers: [AppController, DoorController, Day2Controller, Day3Controller],
  providers: [AppService],
})
export class AppModule {}

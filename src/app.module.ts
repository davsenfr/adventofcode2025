import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import {DoorController} from "./door.controller";
import { HttpModule } from '@nestjs/axios';
import {Day2Controller} from "./day2.controller";
import {Day3Controller} from "./day3.controller";
import {Day4Controller} from "./day4.controller";

@Module({
  imports: [HttpModule],
  controllers: [AppController, DoorController, Day2Controller, Day3Controller, Day4Controller],
  providers: [AppService],
})
export class AppModule {}

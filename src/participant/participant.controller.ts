import { Controller, Get, Param } from '@nestjs/common';
import { ParticipantService } from './participant.service';

@Controller('participant')
export class ParticipantController {
  constructor(private readonly participantService: ParticipantService) {}

  @Get('all')
  async getAll() {
    try {
      const data = await this.participantService.getAll();
      return data;
    }
    catch (e) {
      console.log(e);
      return e;
    }
  }

  @Get('one/:id')
  async getByID(@Param('id') id: string) {
    try {
      const data = await this.participantService.getByID(id);
      return data;
    }
    catch (e) {
      console.log(e);
      return e;
    }
  }

  @Get('raffleid/:id')
  async getByRaffleID(@Param('id') id: string) {
    try {
      const data = await this.participantService.getByRaffleID(id);
      return data;
    }
    catch (e) {
      console.log(e);
      return e;
    }
  }

  @Get('ids')
  async getAllIDs() {
    console.log('getting all ids');
    try {
      const data = await this.participantService.getAllIDs();
      return data;
    }
    catch (e) {
      console.log(e);
      return e;
    }
  }
}

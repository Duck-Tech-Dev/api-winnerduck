import { Controller, Get, Param } from '@nestjs/common';
import { RaffleService } from 'src/raffle/raffle.service';

@Controller('raffle')
export class RaffleController {
  constructor(private readonly raffleService: RaffleService) {}

  @Get('all')
  async getAll() {
    try {
      const data = await this.raffleService.getAll();
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
      const data = await this.raffleService.getByID(id);
      return data;
    }
    catch (e) {
      console.log(e);
      return e;
    }
  }

  @Get('userid/:id')
  async getByRaffleID(@Param('id') id: string) {
    try {
      const data = await this.raffleService.getByUserID(id);
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
      const data = await this.raffleService.getAllIDs();
      return data;
    }
    catch (e) {
      console.log(e);
      return e;
    }
  }

}

import { Module } from '@nestjs/common';
import { RaffleService } from './raffle.service';
import { PostgresService } from 'src/postgres/postgres.service';
import { RaffleController } from './raffle.controller';

@Module({
  providers: [PostgresService, RaffleService],
  controllers: [RaffleController]
})
export class RaffleModule {}

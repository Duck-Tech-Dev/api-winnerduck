import { Module } from '@nestjs/common';
import { ParticipantService } from 'src/participant/participant.service';
import { ParticipantController } from 'src/participant/participant.controller';
import { PostgresService } from 'src/postgres/postgres.service';

@Module({
  providers: [PostgresService, ParticipantService],
  controllers: [ParticipantController]
})
export class ParticipantModule {}

import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresService } from './postgres/postgres.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ParticipantModule } from './participant/participant.module';
import { RaffleModule } from './raffle/raffle.module';

@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, ParticipantModule, RaffleModule],
  controllers: [AppController],
  providers: [AppService, PostgresService],
})
export class AppModule {}

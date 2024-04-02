import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PostgresService } from './postgres/postgres.service';
import { UserModule } from './user/user.module';
import { AuthModule } from './auth/auth.module';
import { ThrottlerModule } from '@nestjs/throttler';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ThrottlerModule.forRoot([{
      ttl: 1000,
      limit: 2
    }]),
    UserModule,
    AuthModule, ],
  controllers: [AppController],
  providers: [AppService, PostgresService],
})
export class AppModule {}

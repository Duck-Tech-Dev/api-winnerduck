import { Module } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';
import { UserService } from './user.service';
import { UserController } from './user.controller';

@Module({
  providers: [PostgresService, UserService],
  controllers: [UserController],
  exports: [UserService],
})
export class UserModule {}

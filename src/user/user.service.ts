import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';

@Injectable()
export class UserService {
  static readonly table = 'users';
  static readonly id = 'id';
  static readonly username = 'username';
  static readonly email = 'email';
  static readonly password = 'password';
  static readonly created_at = 'created_at';
  constructor(private readonly postgresService: PostgresService) {}

  async getAll() {
    const data = await this.postgresService.query(`SELECT * FROM ${UserService.table}`);
    return data.rows;
  }

  async getByID(id: string) {
    const data = await this.postgresService.query(`SELECT * FROM ${UserService.table} WHERE ${UserService.id} = ${id}`);
    return data.rows;
  }

  async getAllIDs() {
    console.log(`SELECT ${UserService.id} FROM ${UserService.table}`);
    const data = await this.postgresService.query(`SELECT ${UserService.id} FROM ${UserService.table}`);
    return data.rows;
  }

}

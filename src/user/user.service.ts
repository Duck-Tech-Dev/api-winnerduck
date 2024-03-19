import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';

export interface User {
  id: string;
  username: string;
  email: string;
  password: string;
  created_at: string;
};

export enum Table {
  users = 'users',
}

export enum UserRow {
  id = 'id',
  username = 'username',
  email = 'email',
  password = 'password',
  created_at = 'created_at'
}

@Injectable()
export class UserService {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<User[]> {
    const data = await this.postgresService.query(`SELECT * FROM ${Table.users}`);
    return data.rows;
  }

  async getByID(id: string): Promise<User> {
    const data = await this.postgresService.query(`SELECT * FROM ${Table.users} WHERE ${UserRow.id}=$1`, [id]);
    return data.rows;
  }

  async getAllIDs(): Promise<string[]> {
    const data = await this.postgresService.query(`SELECT ${UserRow.id} FROM ${Table.users}`);
    return data.rows;
  }

  async getByUsername(username: string): Promise<User> {
    const data = await this.postgresService.query(`SELECT * FROM ${Table.users} WHERE ${UserRow.username}=$1`, [username]);
    return data.rows[0];
  }

  async getByEmail(email: string): Promise<User> {
    const data = await this.postgresService.query(`SELECT * FROM ${Table.users} WHERE ${UserRow.email}=$1`, [email]);
    return data.rows[0];
  }

  async createUser(username: string, email: string, password: string): Promise<User> {
    const id = await this.createID();
    const data = await this.postgresService.query(`INSERT INTO ${Table.users} (${UserRow.id}, ${UserRow.username}, ${UserRow.email}, ${UserRow.password}) VALUES ($1, $2, $3, $4) RETURNING *`, [id, username, email, password]);
    return data.rows[0];
  }

  async createID(): Promise<string> {
    const allIDs = await this.getAllIDs();
    //id will be between 00_000 and 99_999
    let id: string;

    do {
      id = Math.floor(Math.random() * 90_000 + 10_000).toString();
    } while (allIDs.includes(id));

    return id;
  }
}

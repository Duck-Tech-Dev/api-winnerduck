import { Injectable } from '@nestjs/common';
import { PostgresService } from 'src/postgres/postgres.service';

export interface User {
    id: string;
    username: string;
    email: string;
    password: string;
    created_at: string;
};

@Injectable()
export class UserService {
    static readonly table = 'users';
    static readonly id = 'id';
    static readonly username = 'username';
    static readonly email = 'email';
    static readonly password = 'password';
    static readonly created_at = 'created_at';

    constructor(private readonly postgresService: PostgresService) {}

    async getAll(): Promise<User[]> {
        const data = await this.postgresService.query(`SELECT * FROM ${UserService.table}`);
        return data.rows;
    }

    async getByID(id: string): Promise<User> {
        const data = await this.postgresService.query(`SELECT * FROM ${UserService.table} WHERE ${UserService.id} = ${id}`);
        return data.rows;
    }

    async getAllIDs(): Promise<string[]> {
        console.log(`SELECT ${UserService.id} FROM ${UserService.table}`);
        const data = await this.postgresService.query(`SELECT ${UserService.id} FROM ${UserService.table}`);
        return data.rows;
    }

    async getByUsername(username: string): Promise<User> {
        const data = await this.postgresService.query(`SELECT * FROM ${UserService.table} WHERE ${UserService.username} = '${username}'`);
        return data.rows;
    }

    async getByEmail(email: string): Promise<User> {
        const data = await this.postgresService.query(`SELECT * FROM ${UserService.table} WHERE ${UserService.email} = '${email}'`);
        return data.rows;
    }

    async createUser(username: string, email: string, password: string): Promise<User> {
        const id = await this.createID();
        const data = await this.postgresService.query(`INSERT INTO ${UserService.table} (${UserService.id}, ${UserService.username}, ${UserService.email}, ${UserService.password}) VALUES ('${id}', '${username}', '${email}', '${password}') RETURNING *`);
        return data.rows;
    }

    async createID(): Promise<string> {
        const id = Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
        return id;
    }
}

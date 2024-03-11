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
        const data = await this.postgresService.query(`SELECT ${UserService.id} FROM ${UserService.table}`);
        return data.rows;
    }

    async getByUsername(username: string): Promise<User> {
        const data = await this.postgresService.query(`SELECT * FROM ${UserService.table} WHERE ${UserService.username} = '${username}'`);
        return data.rows[0];
    }

    async getByEmail(email: string): Promise<User> {
        const data = await this.postgresService.query(`SELECT * FROM ${UserService.table} WHERE ${UserService.email} = '${email}'`);
        return data.rows[0];
    }

    async createUser(username: string, email: string, password: string): Promise<User> {
        const id = await this.createID();
        const data = await this.postgresService.query(`INSERT INTO ${UserService.table} (${UserService.id}, ${UserService.username}, ${UserService.email}, ${UserService.password}) VALUES ('${id}', '${username}', '${email}', '${password}') RETURNING *`);
        return data.rows[0];
    }

    async createID(): Promise<string> {
        const allIDs = await this.getAllIDs();
        //id will be between 00_000 and 99_999
        let id: string = Math.floor(Math.random() * 90_000 + 10_000).toString();
        while (allIDs.includes(id)) {
            id = Math.floor(Math.random() * 90_000 + 10_000).toString();
        }
        return id;
    }
}

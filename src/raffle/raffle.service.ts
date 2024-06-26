import { Injectable } from '@nestjs/common';
import { RaffleColumn, Table } from 'src/postgres/database_tables';
import { PostgresService } from 'src/postgres/postgres.service';

import { FormQuestion, } from 'src/interfaces/formQuestion';
import { Raffle } from 'src/interfaces/raffle';


@Injectable()
export class RaffleService {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Raffle[]> {
    const data = await this.postgresService.query(`SELECT * FROM ${Table.raffles}`);
    return data.rows;
  }

  async getByID(id: string): Promise<Raffle> {
    const data = await this.postgresService.query(`SELECT * FROM ${Table.raffles} WHERE ${RaffleColumn.id}=$1`, [id]);
    return data.rows[0];
  }

  async getAllIDs(): Promise<string[]> {
    const data = await this.postgresService.query(`SELECT ${RaffleColumn.id} FROM ${Table.raffles}`);
    return data.rows;
  }

  async getByUserID(authorid: string): Promise<Raffle[]> {
    const data = await this.postgresService.query(`SELECT * FROM ${Table.raffles} WHERE ${RaffleColumn.author_id}=$1`, [authorid]);
    return data.rows;
  }

  async createRaffle(rafflename: string, form: FormQuestion[], authorid: string): Promise<Raffle> {
    const id = await this.createID();
    const data = await this.postgresService.query(`INSERT INTO ${Table.raffles} (${RaffleColumn.id}, ${RaffleColumn.title}, ${RaffleColumn.form}, ${RaffleColumn.author_id}) VALUES ($1, $2, $3, $4) RETURNING *`, [id, rafflename, form, authorid]);
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

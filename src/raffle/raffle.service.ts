import { Injectable } from '@nestjs/common';
import { RaffleColumn, Table } from 'src/postgres/database_tables';
import { PostgresService } from 'src/postgres/postgres.service';

export interface Raffle {
  raffleid: string,
  rafflename: object,
  form: object,
  authorid: string,
}

@Injectable()
export class RaffleService {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Raffle[]> {
    const data = await this.postgresService.query(`SELECT * FROM ${Table.raffles}`);
    return data.rows;
  }

  async getByID(id: string): Promise<Raffle> {
    const data = await this.postgresService.query(`SELECT * FROM ${Table.raffles} WHERE ${RaffleColumn.raffleid}=$1`, [id]);
    return data.rows[0];
  }

  async getAllIDs(): Promise<string[]> {
    const data = await this.postgresService.query(`SELECT ${RaffleColumn.raffleid} FROM ${Table.raffles}`);
    return data.rows;
  }

  async getByUserID(authorid: string): Promise<Raffle[]> {
    const data = await this.postgresService.query(`SELECT * FROM ${Table.raffles} WHERE ${RaffleColumn.authorid}=$1`, [authorid]);
    return data.rows;
  }

  async createRaffle(info: object, raffleid: string): Promise<Raffle> {
    const id = await this.createID();
    const data = await this.postgresService.query(`INSERT INTO ${Table.raffles} (${RaffleColumn.raffleid}, ${RaffleColumn.rafflename}, ${RaffleColumn.raffleid}) VALUES ($1, $2, $3) RETURNING *`, [id, info, raffleid]);
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

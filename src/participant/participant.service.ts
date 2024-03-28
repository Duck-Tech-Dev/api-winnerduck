import { Injectable } from '@nestjs/common';
import { ParticipantColumn, Table } from 'src/postgres/database_tables';
import { PostgresService } from 'src/postgres/postgres.service';

export interface Participant {
  participantid: string,
  info: object,
  raffleid: string,
}

@Injectable()
export class ParticipantService {
  constructor(private readonly postgresService: PostgresService) {}

  async getAll(): Promise<Participant[]> {
    const data = await this.postgresService.query(`SELECT * FROM ${Table.participants}`);
    return data.rows;
  }

  async getByID(id: string): Promise<Participant> {
    const data = await this.postgresService.query(`SELECT * FROM ${Table.participants} WHERE ${ParticipantColumn.participantid}=$1`, [id]);
    return data.rows[0];
  }

  async getAllIDs(): Promise<string[]> {
    const data = await this.postgresService.query(`SELECT ${ParticipantColumn.participantid} FROM ${Table.participants}`);
    return data.rows;
  }

  async getByRaffleID(raffleid: string): Promise<Participant[]> {
    const data = await this.postgresService.query(`SELECT * FROM ${Table.participants} WHERE ${ParticipantColumn.participantid}=$1`, [raffleid]);
    return data.rows;
  }

  async createParticipant(info: object, raffleid: string): Promise<Participant> {
    const id = await this.createID();
    const data = await this.postgresService.query(`INSERT INTO ${Table.participants} (${ParticipantColumn.participantid}, ${ParticipantColumn.info}, ${ParticipantColumn.raffleid}) VALUES ($1, $2, $3) RETURNING *`, [id, info, raffleid]);
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

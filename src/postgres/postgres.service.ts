import { Injectable } from '@nestjs/common';
import { Pool } from 'pg';

@Injectable()
export class PostgresService {
  private readonly pool: Pool;

  constructor() {
    this.pool = new Pool({
      database: process.env.database,
      host: process.env.host,
      port: process.env.port,
      user: process.env.user,
      password: process.env.password
    });
  }

  async query(query: string, params: any[] = []): Promise<any> {
    const client = await this.pool.connect();
    try {
      return await client.query(query, params);
    }
    finally {
      client.release();
    }
  }
}

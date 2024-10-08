import postgres, { Sql } from 'postgres';
import { Injectable, OnModuleDestroy } from '@nestjs/common';
import { StatesResponseDto } from './dto/states-response.dto';

@Injectable()
export class PincodeRepository implements OnModuleDestroy {
  private sql: Sql;

  constructor() {
    this.sql = postgres(process.env.PINCODE_DATABASE_URL);
  }
  async onModuleDestroy(): Promise<void> {
    await this.sql.end();
  }
  async getAllStates() {
    const data = await this.sql`SELECT DISTINCT "StateName" FROM pincode`;
    const states: string[] = data.map((state) => state.StateName);
    return { states } as StatesResponseDto;
  }
  async getPostOffice(search: string) {
    const data = await this
      .sql`SELECT * FROM pincode WHERE "OfficeName" % ${search} ORDER BY similarity("OfficeName", ${search}) DESC LIMIT 10`;
    return data;
  }

  async findPincode(pincode: string) {
    const data = await this
      .sql`SELECT * FROM pincode WHERE "Pincode" = ${pincode}`;
    return data;
  }
}

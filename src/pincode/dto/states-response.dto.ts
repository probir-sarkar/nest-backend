import { ApiProperty } from '@nestjs/swagger';

export class StatesResponseDto {
  @ApiProperty({
    type: [String],
    example: ['ANDAMAN AND NICOBAR ISLANDS', 'ANDHRA PRADESH'],
  })
  states: string[];
}

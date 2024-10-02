import { ApiProperty } from '@nestjs/swagger';

export class StatesResponseDto {
  @ApiProperty({
    type: [String],
    example: [
      'ANDAMAN AND NICOBAR ISLANDS',
      'ANDHRA PRADESH',
      'ARUNACHAL PRADESH',
      'ASSAM',
      'BIHAR',
      'CHANDIGARH',
      'CHHATTISGARH',
      'DELHI',
      'GOA',
      'GUJARAT',
      'HARYANA',
    ],
  })
  states: string[];
}

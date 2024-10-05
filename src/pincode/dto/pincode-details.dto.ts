import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class PostOfficeDto {
  @ApiProperty({
    example: 'Karnataka Circle',
    description: 'The name of the postal circle',
  })
  @IsString()
  CircleName: string;

  @ApiProperty({
    example: 'South Karnataka Region',
    description: 'The name of the postal region',
  })
  @IsString()
  RegionName: string;

  @ApiProperty({
    example: 'Shivamogga Division',
    description: 'The name of the postal division',
  })
  @IsString()
  DivisionName: string;

  @ApiProperty({
    example: 'Mumbar B.O',
    description: 'The name of the post office',
  })
  @IsString()
  OfficeName: string;

  @ApiProperty({
    example: '577418',
    description: 'The pincode of the post office',
  })
  @IsString()
  Pincode: string;

  @ApiProperty({
    example: 'BO',
    description: 'The type of the post office (BO, SO, HO)',
  })
  @IsString()
  OfficeType: string;

  @ApiProperty({
    example: 'Delivery',
    description: 'Whether the post office has delivery services',
  })
  @IsString()
  Delivery: string;

  @ApiProperty({
    example: 'SHIVAMOGGA',
    description: 'The district where the post office is located',
  })
  @IsString()
  District: string;

  @ApiProperty({
    example: 'KARNATAKA',
    description: 'The state where the post office is located',
  })
  @IsString()
  StateName: string;

  @ApiProperty({
    example: '13.9000000',
    description: 'Latitude of the post office location',
  })
  @IsString() // You can use IsNumberString if you want strict numeric string validation
  Latitude: string;

  @ApiProperty({
    example: '75.1400000',
    description: 'Longitude of the post office location',
  })
  @IsString() // You can use IsNumberString if you want strict numeric string validation
  Longitude: string;
}

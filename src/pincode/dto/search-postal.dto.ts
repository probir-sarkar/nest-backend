import { IsString, Length } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';

export class SearchPostalDto {
  @ApiProperty({
    type: String,
    example: 'Mumbai',
    description: 'Name of the city or village',
  })
  @IsString({
    message: 'Please enter a valid city name',
  })
  @Length(3, 50, {
    message: 'Please enter a city name between 3 and 50 characters',
  })
  search: string;
}

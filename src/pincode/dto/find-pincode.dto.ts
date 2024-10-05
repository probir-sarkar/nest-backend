import { Length, IsString, IsNumberString } from 'class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { Transform } from 'class-transformer';

export class FindPincodeDto {
  @ApiProperty({
    example: '713156',
    description: 'The pincode of the post office',
  })
  @IsString() // Ensure that pincode is treated as a string
  @Length(6, 6, {
    message: 'Please enter a valid pincode',
  })
  pincode: string;
}

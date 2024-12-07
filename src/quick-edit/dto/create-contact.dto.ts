import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsObject,
  IsOptional,
  IsString,
  Length,
  ValidateNested,
} from 'class-validator';
import { Type } from 'class-transformer';

class AddressDto {
  @ApiProperty({ description: 'Address line 1', maxLength: 255 })
  @IsString()
  @Length(1, 255)
  line1: string;

  @ApiPropertyOptional({ description: 'Address line 2', maxLength: 255 })
  @IsOptional()
  @IsString()
  @Length(0, 255)
  line2?: string;

  @ApiProperty({ description: 'City', maxLength: 255 })
  @IsString()
  @Length(1, 255)
  city: string;

  @ApiProperty({ description: 'State', maxLength: 255 })
  @IsString()
  @Length(1, 255)
  state: string;

  @ApiProperty({ description: 'Country', maxLength: 255 })
  @IsString()
  @Length(1, 255)
  country: string;

  @ApiProperty({ description: 'ZIP code', maxLength: 255 })
  @IsString()
  @Length(1, 255)
  zipCode: string;
}

export class CreateContactDto {
  @ApiProperty({ description: 'First name', minLength: 3, maxLength: 14 })
  @IsString()
  @Length(3, 14)
  firstName: string;

  @ApiProperty({ description: 'Last name', minLength: 3, maxLength: 14 })
  @IsString()
  @Length(3, 14)
  lastName: string;

  @ApiProperty({ description: 'Email address', example: 'example@example.com' })
  @IsEmail()
  email: string;

  @ApiProperty({ description: 'Phone number', minLength: 6, maxLength: 18 })
  @IsString()
  @Length(6, 18)
  phone: string;

  @ApiProperty({
    description: 'Gender',
    enum: ['MALE', 'FEMALE', 'OTHER'],
    enumName: 'Gender',
  })
  @IsEnum(['MALE', 'FEMALE', 'OTHER'])
  gender: 'MALE' | 'FEMALE' | 'OTHER';

  @ApiPropertyOptional({ description: 'Other details (optional)' })
  @IsOptional()
  @IsObject()
  other?: Record<string, any>;

  @ApiProperty({ description: 'Address details' })
  @ValidateNested()
  @Type(() => AddressDto)
  address: AddressDto;
}

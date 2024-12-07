import { ApiPropertyOptional } from '@nestjs/swagger';
import {
  IsOptional,
  IsString,
  IsEmail,
  IsEnum,
  MinLength,
  MaxLength,
  IsNumber,
} from 'class-validator';

export class UpdateContactDto {
  @ApiPropertyOptional({
    description: 'First name of the contact',
    example: 'John',
    minLength: 3,
    maxLength: 14,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(14)
  firstName?: string;

  @ApiPropertyOptional({
    description: 'Last name of the contact',
    example: 'Doe',
    minLength: 3,
    maxLength: 14,
  })
  @IsOptional()
  @IsString()
  @MinLength(3)
  @MaxLength(14)
  lastName?: string;

  @ApiPropertyOptional({
    description: 'Email address of the contact',
    example: 'john.doe@example.com',
  })
  @IsOptional()
  @IsEmail()
  email?: string;

  @ApiPropertyOptional({
    description: 'Phone number of the contact',
    example: '1234567890',
    minLength: 6,
    maxLength: 18,
  })
  @IsOptional()
  @IsString()
  @MinLength(6)
  @MaxLength(18)
  phone?: string;

  @ApiPropertyOptional({
    description: 'Gender of the contact',
    enum: ['MALE', 'FEMALE', 'OTHER'],
  })
  @IsOptional()
  @IsEnum(['MALE', 'FEMALE', 'OTHER'])
  gender?: 'MALE' | 'FEMALE' | 'OTHER';
}

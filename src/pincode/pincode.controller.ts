import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PincodeService } from './pincode.service';
import { ApiResponse, ApiTags } from '@nestjs/swagger';
import { StatesResponseDto } from './dto/states-response.dto';

@ApiTags('pincode')
@Controller('pincode')
export class PincodeController {
  constructor(private readonly pincodeService: PincodeService) {}
  @Get()
  findAll() {
    return this.pincodeService.findAll();
  }
  @Get('states')
  @ApiResponse({
    type: StatesResponseDto,
    description: 'List of Indian states',
  })
  getAllStates(): Promise<StatesResponseDto> {
    return this.pincodeService.getAllStates();
  }
}

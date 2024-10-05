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
import { SearchPostalDto } from './dto/search-postal.dto';
import { PostOfficeDto } from './dto/pincode-details.dto';
import { FindPincodeDto } from './dto/find-pincode.dto';

@ApiTags('pincode')
@Controller('pincode')
export class PincodeController {
  constructor(private readonly pincodeService: PincodeService) {}

  @Get(':pincode')
  @ApiResponse({
    type: [PostOfficeDto],
    description: 'List of post offices based on pincode',
  })
  findPincode(@Param() param: FindPincodeDto) {
    return this.pincodeService.findPincode(param.pincode);
  }

  @Get('post-office/:search')
  @ApiResponse({
    type: [PostOfficeDto],
    description: 'List of post offices based on search query',
  })
  findAll(@Param() param: SearchPostalDto) {
    return this.pincodeService.findPostOffice(param.search);
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

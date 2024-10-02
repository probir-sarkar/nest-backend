import { Module } from '@nestjs/common';
import { PincodeService } from './pincode.service';
import { PincodeController } from './pincode.controller';
import { PincodeRepository } from './pincode.repository';

@Module({
  controllers: [PincodeController],
  providers: [PincodeService, PincodeRepository],
  exports: [PincodeService],
})
export class PincodeModule {}

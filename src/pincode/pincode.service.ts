import { Injectable } from '@nestjs/common';
import { CreatePincodeDto } from './dto/create-pincode.dto';
import { UpdatePincodeDto } from './dto/update-pincode.dto';
import { PincodeRepository } from './pincode.repository';

@Injectable()
export class PincodeService {
  constructor(private readonly pincodeRepository: PincodeRepository) {}
  create(createPincodeDto: CreatePincodeDto) {
    return 'This action adds a new pincode';
  }
  findPostOffice(search: string) {
    return this.pincodeRepository.getPostOffice(search);
    // return search;
  }
  findPincode(pincode: string) {
    return this.pincodeRepository.findPincode(pincode);
  }

  findAll() {
    return this.pincodeRepository.getAllStates();
  }
  getAllStates() {
    return this.pincodeRepository.getAllStates();
  }

  findOne(id: number) {
    return `This action returns a #${id} pincode`;
  }

  update(id: number, updatePincodeDto: UpdatePincodeDto) {
    return `This action updates a #${id} pincode`;
  }

  remove(id: number) {
    return `This action removes a #${id} pincode`;
  }
}

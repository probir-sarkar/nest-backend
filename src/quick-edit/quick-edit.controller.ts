import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { QuickEditService } from './quick-edit.service';
import { ApiTags } from '@nestjs/swagger';
import { CreateContactDto } from './dto/create-contact.dto';
import { UpdateContactDto } from './dto/update-contact.dto';

@ApiTags('Quick Edit')
@Controller('quick-edit')
export class QuickEditController {
  constructor(private readonly quickEditService: QuickEditService) {}

  @Post()
  create(@Body() createContactDto: CreateContactDto) {
    return this.quickEditService.create(createContactDto);
  }

  @Get()
  findAll() {
    return this.quickEditService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.quickEditService.findOne(+id);
  }

  @Patch(':id')
  patch(@Param('id') id: string, @Body() updateContactDto: UpdateContactDto) {
    return this.quickEditService.patch(+id, updateContactDto);
  }
  @Put(':id')
  update(@Param('id') id: string, @Body() createContactDto: CreateContactDto) {
    return this.quickEditService.update(+id, createContactDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.quickEditService.remove(+id);
  }
}

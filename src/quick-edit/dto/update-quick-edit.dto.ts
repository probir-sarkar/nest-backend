import { PartialType } from '@nestjs/swagger';
import { CreateQuickEditDto } from './create-quick-edit.dto';

export class UpdateQuickEditDto extends PartialType(CreateQuickEditDto) {}

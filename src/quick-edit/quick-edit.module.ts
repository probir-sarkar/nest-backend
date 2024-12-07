import { Module } from '@nestjs/common';
import { QuickEditService } from './quick-edit.service';
import { QuickEditController } from './quick-edit.controller';
import { PrismaService } from 'src/prisma.service';

@Module({
  controllers: [QuickEditController],
  providers: [QuickEditService, PrismaService],
})
export class QuickEditModule {}

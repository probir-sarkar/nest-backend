import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PincodeModule } from './pincode/pincode.module';
import { ConfigModule } from '@nestjs/config';
import { QuickEditModule } from './quick-edit/quick-edit.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PincodeModule,
    QuickEditModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

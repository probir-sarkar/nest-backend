import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PincodeModule } from './pincode/pincode.module';
import { ConfigModule } from '@nestjs/config';
import { QuickEditModule } from './quick-edit/quick-edit.module';
import { TicTacToeModule } from './tic-tac-toe/tic-tac-toe.module';
import { UploadModule } from './upload/upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    PincodeModule,
    QuickEditModule,
    TicTacToeModule,
    UploadModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}

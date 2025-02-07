import { Module } from '@nestjs/common';
import { TicTacToeGateway } from './tic-tac-toe.gateway';
import { UserSessionManager } from './user-session.manager';

@Module({
  providers: [TicTacToeGateway, UserSessionManager],
})
export class TicTacToeModule {}

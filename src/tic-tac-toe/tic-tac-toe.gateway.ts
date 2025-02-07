import {
  WebSocketGateway,
  SubscribeMessage,
  OnGatewayConnection,
  OnGatewayDisconnect,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { UserSessionManager } from './user-session.manager';

@WebSocketGateway({ cors: true })
export class TicTacToeGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer() server: Server;
  private userSessionManager: UserSessionManager;
  onModuleInit() {
    // Initialize `UserSessionManager` after `server` is available
    this.userSessionManager = new UserSessionManager(this.server);
  }

  private games: Record<string, { board: string[]; currentPlayer: string }> =
    {};

  handleConnection(client: Socket) {
    console.log(`Client connected: ${client.id}`);
  }

  handleDisconnect(client: Socket) {
    const userId = client.handshake.query.userId; // Retrieve userId from query params
    console.log(`User ID: ${userId}`);
    // Now you can remove the user from the session manager
    if (userId) {
      this.userSessionManager.removeUser(userId.toString());
    }
  }

  @SubscribeMessage('joinGame')
  joinGame(client: Socket, payload: { userId: string; room: string }) {
    const { userId, room } = payload;
    this.userSessionManager.addUserToRoom(client, userId, room);

    const clients = this.server.sockets.adapter.rooms.get(room);
    if (clients.size === 1) {
      this.games[room] = {
        board: Array(9).fill(''),
        currentPlayer: 'X',
      };
      client.emit('gameJoined', { player: 'X' });
    } else if (clients.size === 2) {
      client.emit('gameJoined', { player: 'O' });
      this.server.to(room).emit('gameStart', this.games[room]);
    }
  }

  @SubscribeMessage('makeMove')
  makeMove(client: Socket, { room, index }: { room: string; index: number }) {
    const game = this.games[room];
    if (game.board[index] === '' && client.rooms.has(room)) {
      game.board[index] = game.currentPlayer;
      game.currentPlayer = game.currentPlayer === 'X' ? 'O' : 'X';
      this.server.to(room).emit('moveMade', game);

      if (this.checkWinner(game.board)) {
        this.server
          .to(room)
          .emit('gameOver', { winner: game.currentPlayer === 'X' ? 'O' : 'X' });
        delete this.games[room];
      } else if (game.board.every((cell) => cell !== '')) {
        this.server.to(room).emit('gameOver', { winner: 'Draw' });
        delete this.games[room];
      }
    }
  }

  private checkWinner(board: string[]): boolean {
    const winPatterns = [
      [0, 1, 2],
      [3, 4, 5],
      [6, 7, 8],
      [0, 3, 6],
      [1, 4, 7],
      [2, 5, 8],
      [0, 4, 8],
      [2, 4, 6],
    ];
    return winPatterns.some(
      ([a, b, c]) => board[a] && board[a] === board[b] && board[a] === board[c],
    );
  }
}

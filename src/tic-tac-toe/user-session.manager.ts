import { Server, Socket } from 'socket.io';

export class UserSessionManager {
  private userSessions: Map<string, string> = new Map(); // Using Map for faster lookups

  constructor(private server: Server) {}

  addUserToRoom(client: Socket, userId: string, roomId: string): boolean {
    if (this.isRoomFull(roomId)) {
      client.emit('roomFull', { room: roomId, message: 'Room is full.' });
      return false; // Room is full
    } else if (this.isUserInRoom(userId)) {
      client.emit('alreadyInRoom', {
        room: roomId,
        message:
          'You are already in a room. Please leave the current room first.',
      });
      return false;
    }
    client.join(roomId);
    this.userSessions.set(userId, roomId);
    return true;
  }

  removeUser(userId: string): void {
    // get roomId from userSessions
    const roomId = this.userSessions.get(userId);
    if (roomId) {
      this.userSessions.delete(userId);
      this.server.to(roomId).emit('userLeft', { userId });
    }
  }

  getUserRoom(userId: string): string | undefined {
    return this.userSessions.get(userId);
  }

  isUserInRoom(userId: string): boolean {
    return this.userSessions.has(userId);
  }

  isRoomFull(roomId: string): boolean {
    const clients = this.server.sockets.adapter.rooms.get(roomId);
    console.log(clients);
    return clients ? clients.size >= 2 : false;
  }
}

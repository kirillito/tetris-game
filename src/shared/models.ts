import { Socket } from "socket.io";

export interface Coordinates {
  x: number;
  y: number;
}

export interface Player {
  id: string;
  name: string;

  board: Array<number>;
  piece: Array<Array<number>>;
  position: Coordinates;
  score: number;
}

export interface Window {
  socket: SocketIOClient.Emitter;
  location: {
      reload(forceReload: boolean): void;
  };
  innerHeight: number;
  innerWidth: number;
}

export interface DomainSocket extends Socket {
  player: Player;
}
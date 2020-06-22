import * as socketIO from "socket.io";
//import { Socket } from "socket.io";
import * as express from "express";
import { Request, Response } from "express";
import * as http from "http";
import { v4 as uuid } from "uuid";

import { DomainSocket, Player, Coordinates } from "../shared/models";
import {
    ServerEvent,
    GameEvent,
    PlayerEvent,
} from "../shared/events.model";

const app = express();
const httpServer = new http.Server(app);
const io = socketIO(httpServer);

app.use(express.static("public"));

app.get("/", (req: Request, res: Response) => {
    res.sendfile('./index.html');
});

class GameServer {
  private gameHasStarted: boolean = false;

  constructor() {
    this.socketEvents();
  }

  public connect(port: number): void {
    httpServer.listen(port, () => {
      console.info(`Listening on port ${port}`);
    });
  }

  private createPlayer(socket: DomainSocket, player: Player): void {
    socket.player = {
      name: player.name,
      id: uuid(),

      // TODO move this initialization to server
      board: player.board,
      piece: player.piece,
      position: player.position,
      score: 0
    };
  }

  private socketEvents(): void {
    io.on(ServerEvent.connected, (socket: DomainSocket) => {
      this.attachListeners(socket);
    });
  }
  
  private attachListeners(socket: DomainSocket): void {
    this.addPlayerJoinedListener(socket);
    this.addMovementListener(socket);
    this.addPlayerQuitListener(socket);
  }

  // player joined listener
  private addPlayerJoinedListener(socket: DomainSocket): void {
    socket.on(
      GameEvent.authentication,
      (player: Player) => {
          socket.emit(PlayerEvent.players, this.getAllPlayers());
          this.createPlayer(socket, player);
          socket.broadcast.emit(PlayerEvent.joined, socket.player);
          this.gameInitialised();
      }
    );
  }

  // player left listener
  private addPlayerQuitListener(socket: DomainSocket): void {
    socket.on(ServerEvent.disconnected, () => {
      if (socket.player) {
          socket.broadcast.emit(PlayerEvent.left, socket.player.id);
      }
    });
  }

  // player movement listener
  private addMovementListener(socket: DomainSocket): void {
    socket.on(PlayerEvent.position, (pos: Coordinates) => {
      socket.broadcast.emit(PlayerEvent.position, {
        position: pos,
        player: socket.player,
      });
    });
  }

  private gameInitialised(): void {
    if (!this.gameHasStarted) {
        this.gameHasStarted = true;
    }
  }

  private getAllPlayers(): Array<Player> {
    return Object.keys(io.sockets.connected).reduce((acc, socketID) => {
      const socket = io.sockets.connected[socketID] as DomainSocket;
      const player = socket.player;
      if (player) {
        acc.push(player);
      }
      return acc;
    }, []);
  }
}

const gameServer = new GameServer();
gameServer.connect(3000);
console.log('Connected!');

/*



function createSession(id = createId()) {
  if (sessions.has(id)) {
    throw new Error(`Session ${id} already exists!`);
  }

  const session = new Session(id);
  console.log('Creating new session', session);

  sessions.set(id, session);
  return session;
}

function getSession(id) {
  return sessions.get(id);
}

function broadcastSession(session) {
  const clients = [...session.clients];
  clients.forEach(client => {
    client.send({
      type: 'session-broadcast',
      peers: {
        you: client.id,
        clients: clients.map(clientPeer => {
          return {
            id: clientPeer.id,
            state: clientPeer.state
          };
        })
      }
    });
  });
}

server.on('connection', connection => {
  console.log('Connection established');
  const client = createClient(connection);

  connection.on('message', msg => {
    const data = JSON.parse(msg);

    if (data.type === 'create-session') {
      const session = createSession();
      session.join(client);

      client.state = data.state;
      client.send({
        type: 'session-created',
        id: session.id
      });
      console.log('Message received', msg);
    } else if (data.type === 'join-session') {
      const session = getSession(data.id);
      session.join(client);

      client.state = data.state;
      broadcastSession(session);
      console.log('Message received', msg);
      console.log(session);
    } else if (data.type === 'state-update') {
      const [key, value] = data.state;
      client.state[data.fragment][key] = value;
      client.broadcast(data);
    }
  });

  connection.on('close', () => {
    console.log('Connection closed');
    const session = client.session;
  
    if (session) {
      session.leave(client);
      if (session.clients.size === 0) {
        sessions.delete(session.id);
      }
    }

    broadcastSession(session);

    console.log(sessions);
  });
});
*/
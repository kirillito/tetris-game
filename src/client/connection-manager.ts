import * as io from "socket.io-client";
import { Player } from "../shared/models"
import {
  Window,
} from "../shared/models";
import { PlayerEvent } from "../shared/events.model";
import TetrisManager from "./tetris-manager";
import Tetris from "./tetris";

declare const window: Window;

export default class ConnectionManager {
  private players: Map<string, Tetris>;
  private tetrisManager: TetrisManager;
  private localGame: Tetris;

  constructor() {
    this.players = new Map<string, Tetris>();
  }

  public init(tetrisManager: TetrisManager) {
    this.tetrisManager = tetrisManager;
    this.localGame = tetrisManager.instances[0];
  }

  public connect(address: string) {
    window.socket = io(address);
    
    window.socket.on(PlayerEvent.players, (players: Player[]) => this.updateManager(players));

    // this.connection.addEventListener('open', () => {
    //   console.log('Connection established!');
    //   this.initSession();
    //   this.listenToEvents();
    // });

    // this.connection.addEventListener('message', event => {
    //   console.log('Received message', event.data);
    //   this.receive(event.data);
    // });
  }

  private updateManager(players: Player[]) {
    players.map(player => {
      const tetris = this.tetrisManager.createPlayer();
      //TODO
      //tetris.deserialize(player.state);
      this.players.set(player.id, tetris);
    });


    //const myId = peers.you;

    // const clients = peers.filter(client => client.id !== myId);
    // clients.forEach(client => {
    //   // new player
    //   if (!this.players.has(client.id)) {
    //     const tetris = this.tetrisManager.createPlayer();
    //     tetris.deserialize(client.state);
    //     this.players.set(client.id, tetris);
    //   }
    // });

    // // if in current game there are players that are missing in broadcasted data - remove them
    // [...this.players.entries()].forEach(([id, tetris]) => {
    //   if (!clients.some(client => client.id === id)) {
    //     this.tetrisManager.removePlayer(tetris);
    //     this.players.delete(id);
    //   }
    // });

    // this.localGame = this.tetrisManager.instances[0];
    // const sorted = peers.clients.map(client => this.players.get(client.id || localGame));
    // this.tetrisManager.sortPlayers(sorted);
  }

}
//   initSession() {
//     const sessionId = window.location.hash.split('#')[1];
//     const state = this.localGame.serialize();

//     if (sessionId) {
//       this.send({
//         type: 'join-session',
//         id: sessionId,
//         state
//       });
//     } else {
//       this.send({
//         type: 'create-session',
//         state
//       });
//     }
//   }

//   listenToEvents() {
//     const localGame = this.tetrisManager.instances[0];

//     const player = localGame.player;
//     ['position', 'piece', 'score'].forEach(key => {
//       player.events.listen(key, () => {
//         this.send({
//           type: 'state-update',
//           fragment: 'player',
//           state: [key, player[key]]
//         });
//       });
//     });

//     const board = localGame.player.board;
//     ['grid'].forEach(key => {
//       player.board.events.listen(key, () => {
//         this.send({
//           type: 'state-update',
//           fragment: 'board',
//           state: [key, board[key]]
//         });
//       });
//     });
//   }



//   updatePlayer(id, fragment, [key, value]) {
//     if (!this.players.has(id)) {
//       throw new Error('Client does not exist', id);
//     }

//     const tetris = this.players.get(id);
//     if (fragment === 'board') {
//       tetris.player.board[key] = value;
//     } else {
//       tetris[fragment][key] = value;
//     }    

//     if (key === 'score') {
//       tetris.updateScore(value);
//     } else {
//       tetris.draw();
//     }
//   }

//   receive(msg) {
//     const data = JSON.parse(msg);
//     if (data.type === 'session-created') {
//       window.location.hash = data.id;
//     } else if (data.type === 'session-broadcast') {
//       this.updateManager(data.peers);
//     } else if (data.type === 'state-update') {
//       this.updatePlayer(data.clientId, data.fragment, data.state);
//     }
//     console.log(data);
//   }

//   send(data) {
//     const msg = JSON.stringify(data);
//     //console.log('Sending Message:', msg);
//     this.connection.send(msg);
//   }
// }
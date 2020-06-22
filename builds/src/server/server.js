"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var socketIO = require("socket.io");
//import { Socket } from "socket.io";
var express = require("express");
var http = require("http");
var uuid_1 = require("uuid");
var events_model_1 = require("../shared/events.model");
var app = express();
var httpServer = new http.Server(app);
var io = socketIO(httpServer);
app.use(express.static("public"));
app.get("/", function (req, res) {
    res.sendfile('./index.html');
});
var GameServer = /** @class */ (function () {
    function GameServer() {
        this.gameHasStarted = false;
        this.socketEvents();
        console.log('asd');
    }
    GameServer.prototype.connect = function (port) {
        httpServer.listen(port, function () {
            console.info("Listening on port " + port);
        });
    };
    GameServer.prototype.createPlayer = function (socket, player) {
        socket.player = {
            name: player.name,
            id: uuid_1.v4(),
            // TODO move this initialization to server
            board: player.board,
            piece: player.piece,
            position: player.position,
            score: 0
        };
    };
    GameServer.prototype.socketEvents = function () {
        var _this = this;
        io.on(events_model_1.ServerEvent.connected, function (socket) {
            _this.attachListeners(socket);
        });
    };
    GameServer.prototype.attachListeners = function (socket) {
        this.addPlayerJoinedListener(socket);
        this.addMovementListener(socket);
        this.addPlayerQuitListener(socket);
    };
    // player joined listener
    GameServer.prototype.addPlayerJoinedListener = function (socket) {
        var _this = this;
        socket.on(events_model_1.GameEvent.authentication, function (player) {
            socket.emit(events_model_1.PlayerEvent.players, _this.getAllPlayers());
            _this.createPlayer(socket, player);
            socket.broadcast.emit(events_model_1.PlayerEvent.joined, socket.player);
            _this.gameInitialised();
        });
    };
    // player left listener
    GameServer.prototype.addPlayerQuitListener = function (socket) {
        socket.on(events_model_1.ServerEvent.disconnected, function () {
            if (socket.player) {
                socket.broadcast.emit(events_model_1.PlayerEvent.left, socket.player.id);
            }
        });
    };
    // player movement listener
    GameServer.prototype.addMovementListener = function (socket) {
        socket.on(events_model_1.PlayerEvent.position, function (pos) {
            socket.broadcast.emit(events_model_1.PlayerEvent.position, {
                position: pos,
                player: socket.player,
            });
        });
    };
    GameServer.prototype.gameInitialised = function () {
        if (!this.gameHasStarted) {
            this.gameHasStarted = true;
        }
    };
    GameServer.prototype.getAllPlayers = function () {
        return Object.keys(io.sockets.connected).reduce(function (acc, socketID) {
            var socket = io.sockets.connected[socketID];
            var player = socket.player;
            if (player) {
                acc.push(player);
            }
            return acc;
        }, []);
    };
    return GameServer;
}());
var gameServer = new GameServer();
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
//# sourceMappingURL=server.js.map
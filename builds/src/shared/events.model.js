"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.PlayerEvent = exports.ServerEvent = exports.GameEvent = void 0;
var GameEvent = /** @class */ (function () {
    function GameEvent() {
    }
    GameEvent.authentication = "game:authentication";
    GameEvent.start = "game:start";
    return GameEvent;
}());
exports.GameEvent = GameEvent;
var ServerEvent = /** @class */ (function () {
    function ServerEvent() {
    }
    ServerEvent.connected = "connection";
    ServerEvent.disconnected = "disconnect";
    return ServerEvent;
}());
exports.ServerEvent = ServerEvent;
var PlayerEvent = /** @class */ (function () {
    function PlayerEvent() {
    }
    PlayerEvent.players = "player:players";
    PlayerEvent.joined = "player:joined";
    PlayerEvent.left = "player:left";
    PlayerEvent.position = "player:position";
    PlayerEvent.piece = "player:piece";
    PlayerEvent.score = "player:score";
    PlayerEvent.board = "player:board";
    return PlayerEvent;
}());
exports.PlayerEvent = PlayerEvent;
//# sourceMappingURL=events.model.js.map
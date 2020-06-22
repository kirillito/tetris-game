"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.TetrisGame = void 0;
var io = require("socket.io-client");
//import Player from "./player";
var tetris_manager_1 = require("./tetris-manager");
var TetrisGame = /** @class */ (function () {
    //TODO
    //    private connectionManager: ConnectionManager;
    function TetrisGame(document) {
        var socketUrl = '';
        if (document.location.href.indexOf("localhost") != -1) {
            socketUrl = "http://localhost:3000";
        }
        window.socket = io(socketUrl);
        this.tetrisManager = new tetris_manager_1.default(document);
        //TODO
        //        this.connectionManager = new ConnectionManager();
        this.startGame();
    }
    TetrisGame.prototype.startGame = function () {
        var tetrisLocalGame = this.tetrisManager.createPlayer();
        tetrisLocalGame.element.classList.add('local');
        tetrisLocalGame.run();
        //TODO
        // connectionManager.init(tetrisManager);
        // connectionManager.connect('ws://localhost:9000');
    };
    return TetrisGame;
}());
exports.TetrisGame = TetrisGame;
//# sourceMappingURL=tetris-game.js.map
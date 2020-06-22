"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var tetris_1 = require("./tetris");
var TetrisManager = /** @class */ (function () {
    function TetrisManager(document) {
        this.document = document;
        this.template = this.document.querySelector('#player-template');
        this.instances = [];
    }
    TetrisManager.prototype.createPlayer = function () {
        var element = document.importNode(this.template.content, true).children[0];
        var tetris = new tetris_1.default(element);
        this.document.body.appendChild(tetris.element);
        this.instances.push(tetris);
        return tetris;
    };
    TetrisManager.prototype.removePlayer = function (tetris) {
        this.document.body.removeChild(tetris.element);
        this.instances = this.instances.filter(function (instance) { return instance !== tetris; });
    };
    TetrisManager.prototype.sortPlayers = function (sessions) {
        var _this = this;
        sessions.forEach(function (tetris) {
            _this.document.body.appendChild(tetris.element);
        });
    };
    return TetrisManager;
}());
exports.default = TetrisManager;
//# sourceMappingURL=tetris-manager.js.map
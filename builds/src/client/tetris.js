"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var board_1 = require("./board");
var player_1 = require("./player");
var graphics_service_1 = require("./graphics-service");
var Tetris = /** @class */ (function () {
    function Tetris(element) {
        this.BOARD_WIDTH = 14;
        this.BOARD_HEIGHT = 24;
        this.TILE_COLORS = [
            '#000000',
            '#FF0D72',
            '#0DC2FF',
            '#0DFF72',
            '#F538FF',
            '#FF8E0D',
            '#FFE138',
            '#3877FF'
        ];
        this.element = element;
        this.canvas = element.querySelector('canvas');
        this.canvasContext = this.canvas.getContext('2d');
        var board = new board_1.default(this.BOARD_WIDTH, this.BOARD_HEIGHT);
        this.player = new player_1.default(board);
        // TODO:
        // this.player.events.listen('score', score => {
        //   this.updateScore(score);
        // });
        this.lastTimeUpdated = 0;
        this.updateScore(0);
    }
    Tetris.prototype.run = function () {
        this.update();
    };
    Tetris.prototype.update = function (time) {
        if (time === void 0) { time = 0; }
        var deltaTime = time - this.lastTimeUpdated;
        this.lastTimeUpdated = time;
        this.player.update(deltaTime);
        // draw results
        this.draw();
        var updateCallback = this.update.bind(this);
        requestAnimationFrame(updateCallback);
    };
    Tetris.prototype.draw = function () {
        // background
        graphics_service_1.default.drawRectangle(this.canvasContext, 0, 0, this.canvas.width, this.canvas.height, 'black');
        var drawCallback = this.drawGridTile.bind(this);
        this.player.draw(drawCallback);
    };
    Tetris.prototype.drawGridTile = function (col, row, tileCode) {
        var tileWidth = Math.floor(this.canvas.width / this.BOARD_WIDTH);
        var tileHeight = Math.floor(this.canvas.height / this.BOARD_HEIGHT);
        graphics_service_1.default.drawRectangle(this.canvasContext, col * tileWidth, row * tileHeight, tileWidth, tileHeight, this.TILE_COLORS[tileCode]);
    };
    Tetris.prototype.updateScore = function (score) {
        var scoreElement = this.element.querySelector('.score');
        scoreElement.innerText = score.toString();
    };
    return Tetris;
}());
exports.default = Tetris;
//# sourceMappingURL=tetris.js.map
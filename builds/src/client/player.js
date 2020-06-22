"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var piece_1 = require("./piece");
var input_service_1 = require("./input-service");
var Player = /** @class */ (function () {
    function Player(board) {
        //TODO:
        //this.events = new Events();
        this.DROP_SLOW = 1000;
        this.inputService = null;
        this.dropCounter = 0;
        this.dropInterval = this.DROP_SLOW;
        this.inputService = new input_service_1.default();
        this.inputService.init();
        this.board = board;
        this.dropCounter = 0;
        this.dropInterval = this.DROP_SLOW;
        this.score = 0;
        this.reset();
    }
    Player.prototype.reset = function () {
        this.piece = new piece_1.default();
        ;
        var y = 0;
        var x = (this.board.width / 2 || 0) - (Math.floor(this.piece.matrix[0].length / 2));
        this.position = { x: x, y: y };
        if (this.board.isColliding(this.piece.matrix, this.position.x, this.position.y)) {
            this.board.clear();
            this.score = 0;
            //TODO
            //this.events.emit('score', this.score);
        }
        //TODO
        //this.events.emit('position', this.position);
        //this.events.emit('piece', this.piece);
    };
    Player.prototype.update = function (deltaTime) {
        this.move();
        // check if it is time to drop the current piece
        this.dropCounter += deltaTime;
        if (this.dropCounter > this.dropInterval) {
            this.drop();
        }
    };
    Player.prototype.move = function () {
        if (this.inputService.keyHeld_Left) {
            if (!this.board.isColliding(this.piece.matrix, this.position.x - 1, this.position.y)) {
                this.position.x--;
                //TODO
                //this.events.emit('position', this.position);
            }
            this.inputService.keyHeld_Left = false;
        }
        if (this.inputService.keyHeld_Right) {
            if (!this.board.isColliding(this.piece.matrix, this.position.x + 1, this.position.y)) {
                this.position.x++;
                //TODO
                //this.events.emit('position', this.position);
            }
            this.inputService.keyHeld_Right = false;
        }
        if (this.inputService.keyHeld_Drop) {
            this.drop();
            //TODO
            //this.events.emit('position', this.position);
            this.inputService.keyHeld_Drop = false;
        }
        // if (this.inputService.keyHeld_RotateLeft)	{
        //   this.rotate(1);  
        //   //TODO
        //   //this.events.emit('piece', this.piece);
        //   this.inputService.keyHeld_RotateLeft = false;
        // }
        if (this.inputService.keyHeld_RotateRight) {
            this.rotate(-1);
            //TODO
            //this.events.emit('piece', this.piece);
            this.inputService.keyHeld_RotateRight = false;
        }
    };
    Player.prototype.rotate = function (direction) {
        var previousX = this.position.x;
        var offset = 1;
        this.piece.rotate(direction);
        while (this.board.isColliding(this.piece.matrix, this.position.x, this.position.y)) {
            this.position.x += offset;
            offset = -(offset + (offset > 0 ? 1 : -1));
            if (offset > this.piece.matrix[0].length) {
                this.piece.rotate(-direction);
                this.position.x = previousX;
                return;
            }
        }
    };
    Player.prototype.drop = function () {
        this.dropCounter = 0;
        if (this.board.isColliding(this.piece.matrix, this.position.x, this.position.y + 1)) {
            this.board.merge(this.piece.matrix, this.position.x, this.position.y);
            this.reset();
            this.score += this.board.sweep();
            //TODO
            //this.events.emit('score', this.score);
        }
        else {
            this.position.y++;
        }
        //TODO
        //this.events.emit('position', this.position);
    };
    Player.prototype.draw = function (drawCallback) {
        var _this = this;
        // draw board
        this.board.draw(drawCallback);
        // draw player piece
        this.piece.matrix.forEach(function (row, i) {
            row.forEach(function (value, j) {
                if (value !== 0) {
                    drawCallback(j + _this.position.x, i + _this.position.y, value);
                }
            });
        });
    };
    return Player;
}());
exports.default = Player;
//# sourceMappingURL=player.js.map
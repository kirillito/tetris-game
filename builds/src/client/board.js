"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Board = /** @class */ (function () {
    function Board(width, height) {
        this.width = width;
        this.height = height;
        this.grid = [];
        while (height) {
            this.grid.push(new Array(width).fill(0));
            height--;
        }
        //TODO
        //this.events = new Events();
    }
    Board.prototype.clear = function () {
        this.grid.forEach(function (row) { return row.fill(0); });
        //TODO
        //this.events.emit('grid', this.grid);
    };
    Board.prototype.merge = function (pieceMatrix, x, y) {
        var _this = this;
        pieceMatrix.forEach(function (row, pieceTileY) {
            row.forEach(function (value, pieceTileX) {
                if (value !== 0) {
                    _this.grid[pieceTileY + y][pieceTileX + x] = value;
                }
            });
        });
        //TODO
        //this.events.emit('grid', this.grid);
    };
    Board.prototype.isColliding = function (pieceMatrix, x, y) {
        for (var i = 0; i < pieceMatrix.length; i++) {
            for (var j = 0; j < pieceMatrix[i].length; j++) {
                if (pieceMatrix[i][j] !== 0 && (this.grid[i + y] && this.grid[i + y][j + x]) !== 0) {
                    return true;
                }
            }
        }
        return false;
    };
    Board.prototype.sweep = function () {
        var rowCount = 1;
        var sweepScore = 0;
        outer: for (var i = this.grid.length - 1; i > 0; i--) {
            for (var j = 0; j < this.grid[i].length; j++) {
                if (this.grid[i][j] === 0) {
                    continue outer;
                }
            }
            var row = this.grid.splice(i, 1)[0].fill(0);
            this.grid.unshift(row);
            i++;
            sweepScore += rowCount * 10;
            rowCount *= 2;
        }
        //TODO
        //this.events.emit('grid', this.grid);
        return sweepScore;
    };
    Board.prototype.draw = function (drawCallback) {
        this.grid.forEach(function (row, i) {
            row.forEach(function (value, j) {
                if (value !== 0) {
                    drawCallback(j, i, value);
                }
            });
        });
    };
    return Board;
}());
exports.default = Board;
//# sourceMappingURL=board.js.map
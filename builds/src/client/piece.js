"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var Piece = /** @class */ (function () {
    function Piece(type) {
        this.PIECE_TYPES = 'IJLOSTZ';
        // if type is not specified, use random
        if (!type) {
            type = this.PIECE_TYPES[Math.floor(this.PIECE_TYPES.length * Math.random())];
        }
        this.matrix = this.create(type);
    }
    Piece.prototype.create = function (type) {
        if (type === 'I') {
            return [
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
                [0, 1, 0, 0],
            ];
        }
        else if (type === 'J') {
            return [
                [0, 3, 0],
                [0, 3, 0],
                [3, 3, 0],
            ];
        }
        else if (type === 'L') {
            return [
                [0, 2, 0],
                [0, 2, 0],
                [0, 2, 2],
            ];
        }
        else if (type === 'O') {
            return [
                [4, 4],
                [4, 4],
            ];
        }
        else if (type === 'S') {
            return [
                [0, 6, 6],
                [6, 6, 0],
                [0, 0, 0],
            ];
        }
        else if (type === 'T') {
            return [
                [0, 7, 0],
                [7, 7, 7],
                [0, 0, 0],
            ];
        }
        else if (type === 'Z') {
            return [
                [5, 5, 0],
                [0, 5, 5],
                [0, 0, 0],
            ];
        }
    };
    Piece.prototype.rotate = function (direction) {
        var _a;
        for (var y = 0; y < this.matrix.length; y++) {
            for (var x = 0; x < y; x++) {
                _a = [this.matrix[y][x], this.matrix[x][y]], this.matrix[x][y] = _a[0], this.matrix[y][x] = _a[1];
            }
        }
        if (direction > 0) {
            this.matrix.forEach(function (row) { return row.reverse(); });
        }
        else {
            this.matrix.reverse();
        }
    };
    return Piece;
}());
exports.default = Piece;
//# sourceMappingURL=piece.js.map
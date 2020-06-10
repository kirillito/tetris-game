const PIECE_TYPES = 'IJLOSTZ';

class Piece {
  constructor(type) {
    this.matrix = this.create(type);
  }

  create(type) {
    if (type === 'I') {
      return [
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
          [0, 1, 0, 0],
      ];
    } else if (type === 'J') {
      return [
          [0, 3, 0],
          [0, 3, 0],
          [3, 3, 0],
      ];
    } else if (type === 'L') {
        return [
            [0, 2, 0],
            [0, 2, 0],
            [0, 2, 2],
        ];
    } else if (type === 'O') {
        return [
            [4, 4],
            [4, 4],
        ];
    } else if (type === 'S') {
        return [
            [0, 6, 6],
            [6, 6, 0],
            [0, 0, 0],
        ];
    } else if (type === 'T') {
        return [
            [0, 7, 0],
            [7, 7, 7],
            [0, 0, 0],
        ];
    } else if (type === 'Z') {
      return [
          [5, 5, 0],
          [0, 5, 5],
          [0, 0, 0],
      ];
    }
  }

  rotate(direction) {
    for (let y = 0; y < this.matrix.length; y++) {
      for (let x = 0; x < y; x++) {
          [ this.matrix[x][y], this.matrix[y][x] ] = [ this.matrix[y][x], this.matrix[x][y] ];
      }
    }

    if (direction > 0) {
      this.matrix.forEach(row => row.reverse());
    } else {
      this.matrix.reverse();
    }
  }

  // draw() {
  //   piecesMatrix.forEach((row, y) => {
  //     row.forEach((value, x) => {
  //         if (value !== 0) {
  //           drawRectangle(x + offset.x, y + offset.y, 1, 1, 'red')
  //         }
  //     });
  //   });
  // }
}

const piecesMatrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
];

class Piece {
  constructor(matrix) {
    this.matrix = matrix;
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

  draw() {
    piecesMatrix.forEach((row, y) => {
      row.forEach((value, x) => {
          if (value !== 0) {
            drawRectangle(x + offset.x, y + offset.y, 1, 1, 'red')
          }
      });
    });
  }
}

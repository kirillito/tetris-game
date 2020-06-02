const PIECE_SQUARE_W = 20;
const PIECE_SQUARE_H = 20;

const piecesMatrix = [
  [0, 0, 0],
  [1, 1, 1],
  [0, 1, 0]
];

function drawPiece(piecesMatrix, offset) {
  piecesMatrix.forEach((row, y) => {
    row.forEach((value, x) => {
        if (value !== 0) {
          drawRectangle(x + offset.x, y + offset.y, 1, 1, 'red')
        }
    });
  });
}


class Board {
  tiles;
  width;
  height;

  constructor(width, height) {
    this.width = width;
    this.height = height;
    
    this.tiles = [];
    while (height) {
      this.tiles.push(new Array(width).fill(0));
      height--;
    }
  }
  
  merge(pieceMatrix, x, y) {
    pieceMatrix.forEach((row, pieceTileY) => {
      row.forEach((value, pieceTileX) => {
          if (value !== 0) {
            this.tiles[pieceTileY + y][pieceTileX + x] = value;
          }
      });
    });
  }

  isColliding(pieceMatrix, x, y) {
    for (let i=0; i<pieceMatrix.length; i++) {
      for (let j=0; j<pieceMatrix[i].length; j++) {
        if (pieceMatrix[i][j] !== 0 && (this.tiles[i + y] && this.tiles[i + y][j + x]) !== 0) {
          return true;
        }
      }
    }
  
    return false;
  }

  draw() {
    let tileWidth = Math.floor(canvas.width / BOARD_WIDTH);
    let tileHeight = Math.floor(canvas.height / BOARD_HEIGHT);

    this.tiles.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          drawRectangle(x*tileWidth, y*tileHeight, tileWidth, tileHeight, TILE_COLORS[value]);
        }        
      });
    });
  }
}


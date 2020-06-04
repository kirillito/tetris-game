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

  sweep() {
    let rowCount = 1;
    let sweepScore = 0;
    outer: for (let i = this.tiles.length -1; i > 0; i--) {
        for (let j = 0; j < this.tiles[i].length; j++) {
            if (this.tiles[i][j] === 0) {
                continue outer;
            }
        }

        const row = this.tiles.splice(i, 1)[0].fill(0);
        this.tiles.unshift(row);
        i++;

        sweepScore += rowCount * 10;
        rowCount *= 2;
    }

    return sweepScore;
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


export default class Board {
  private grid: Array<Array<number>>;
  private width: number;
  private height: number;

  constructor(width: number, height: number) {
    this.width = width;
    this.height = height;
    
    this.grid = [];
    while (height) {
      this.grid.push(new Array(width).fill(0));
      height--;
    }

    this.events = new Events();
  }

  clear() {
    this.grid.forEach(row => row.fill(0));
    this.events.emit('grid', this.grid);
  }
  
  merge(pieceMatrix, x, y) {
    pieceMatrix.forEach((row, pieceTileY) => {
      row.forEach((value, pieceTileX) => {
          if (value !== 0) {
            this.grid[pieceTileY + y][pieceTileX + x] = value;
          }
      });
    });

    this.events.emit('grid', this.grid);
  }

  isColliding(pieceMatrix, x, y) {
    for (let i=0; i<pieceMatrix.length; i++) {
      for (let j=0; j<pieceMatrix[i].length; j++) {
        if (pieceMatrix[i][j] !== 0 && (this.grid[i + y] && this.grid[i + y][j + x]) !== 0) {
          return true;
        }
      }
    }  
    return false;
  }

  sweep() {
    let rowCount = 1;
    let sweepScore = 0;
    outer: for (let i = this.grid.length -1; i > 0; i--) {
        for (let j = 0; j < this.grid[i].length; j++) {
            if (this.grid[i][j] === 0) {
                continue outer;
            }
        }

        const row = this.grid.splice(i, 1)[0].fill(0);
        this.grid.unshift(row);
        i++;

        sweepScore += rowCount * 10;
        rowCount *= 2;
    }
    this.events.emit('grid', this.grid);
    return sweepScore;
  }

  draw(drawCallback) {
    this.grid.forEach((row, i) => {
      row.forEach((value, j) => {
        if (value !== 0) {
          drawCallback(j, i, value);
        }        
      });
    });
  }
}


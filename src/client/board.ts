export default class Board {
  private grid: Array<Array<number>>;
  public width: number;
  public height: number;

  constructor(width: number, height: number) {
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

  public clear() {
    this.grid.forEach(row => row.fill(0));
    //TODO
    //this.events.emit('grid', this.grid);
  }
  
  public merge(pieceMatrix: Array<Array<number>>, x: number, y: number) {
    pieceMatrix.forEach((row, pieceTileY) => {
      row.forEach((value, pieceTileX) => {
          if (value !== 0) {
            this.grid[pieceTileY + y][pieceTileX + x] = value;
          }
      });
    });

    //TODO
    //this.events.emit('grid', this.grid);
  }

  public isColliding(pieceMatrix: Array<Array<number>>, x: number, y: number) {
    for (let i=0; i<pieceMatrix.length; i++) {
      for (let j=0; j<pieceMatrix[i].length; j++) {
        if (pieceMatrix[i][j] !== 0 && (this.grid[i + y] && this.grid[i + y][j + x]) !== 0) {
          return true;
        }
      }
    }  
    return false;
  }

  public sweep() {
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
    //TODO
    //this.events.emit('grid', this.grid);
    return sweepScore;
  }

  public draw(drawCallback: CallableFunction) {
    this.grid.forEach((row, i) => {
      row.forEach((value, j) => {
        if (value !== 0) {
          drawCallback(j, i, value);
        }        
      });
    });
  }
}


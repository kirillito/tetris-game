class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Player {
  constructor() {
    this.position = new Coordinates(5, 5);
    this.piece = new Piece(piecesMatrix);;
    this.score = 0;
  }

  reset() {
    this.piece = new Piece(piecesMatrix);
    this.position.y = 0;
    this.position.x = (BOARD_WIDTH / 2 | 0) - (this.piece.matrix[0].length / 2 | 0);

    if (board.isColliding(this.piece.matrix, this.position.x, this.position.y)) {
      board.tiles.forEach(row => row.fill(0));
      this.score = 0;
    }
  }
  
  move() {
    if (keyHeld_Left)	{
      if (!board.isColliding(this.piece.matrix, this.position.x-1, this.position.y)) {
        this.position.x--;
      }
      keyHeld_Left = false;
    }
    if (keyHeld_Right)	{
      if (!board.isColliding(this.piece.matrix, this.position.x+1, this.position.y)) {
        this.position.x++;
      }
      keyHeld_Right = false;
    }
    if (keyHeld_Drop)	{
      this.drop();
      keyHeld_Drop = false;
    }
    if (keyHeld_RotateLeft)	{
      this.rotate(1);
      keyHeld_RotateLeft = false;
    }
    if (keyHeld_RotateRight)	{
      this.rotate(-1);
      keyHeld_RotateRight = false;
    }
  }

  rotate(direction) {
    let previousX = this.position.x;
    let offset = 1;
    this.piece.rotate(direction);
    
    while (board.isColliding(this.piece.matrix, this.position.x, this.position.y)) {
      this.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.piece.matrix[0].length) {
        this.piece.rotate(-direction);
        player.pos.x = previousX;
        return;
      }
    }
  }

  drop() {
    if (board.isColliding(this.piece.matrix, this.position.x, this.position.y+1)) {
      board.merge(this.piece.matrix, this.position.x, this.position.y);
      this.reset();
    } else {
      this.position.y++;
    }
  }

  draw() {
    let tileWidth = Math.floor(canvas.width / BOARD_WIDTH);
    let tileHeight = Math.floor(canvas.height / BOARD_HEIGHT);

    this.piece.matrix.forEach((row, y) => {
      row.forEach((value, x) => {
        if (value !== 0) {
          drawRectangle((x + this.position.x)*tileWidth, (y + this.position.y)*tileHeight, tileWidth, tileHeight, TILE_COLORS[value]);
        }        
      });
    });
  }
}



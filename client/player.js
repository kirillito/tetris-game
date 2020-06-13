class Coordinates {
  constructor(x, y) {
    this.x = x;
    this.y = y;
  }
}

class Player {
  DROP_SLOW = 1000;
  DROP_FAST = 50;

  constructor(board) {
    this.events = new Events();

    this.board = board;

    this.dropCounter = 0;
    this.dropInterval = this.DROP_SLOW;

    this.score = 0;
    this.reset();
  }

  reset() {
    this.piece = new Piece(PIECE_TYPES[PIECE_TYPES.length * Math.random() | 0]);;
    let y = 0;
    let x = (this.board.width / 2 || 0) - (this.piece.matrix[0].length / 2 | 0);
    this.position = new Coordinates(x, y);

    if (this.board.isColliding(this.piece.matrix, this.position.x, this.position.y)) {
      this.board.clear();
      this.score = 0;
    }
  }
  
  move() {
    if (keyHeld_Left)	{
      if (!this.board.isColliding(this.piece.matrix, this.position.x-1, this.position.y)) {
        this.position.x--;
      }
      keyHeld_Left = false;
    }
    if (keyHeld_Right)	{
      if (!this.board.isColliding(this.piece.matrix, this.position.x+1, this.position.y)) {
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
    
    while (this.board.isColliding(this.piece.matrix, this.position.x, this.position.y)) {
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
    if (this.board.isColliding(this.piece.matrix, this.position.x, this.position.y+1)) {
      this.board.merge(this.piece.matrix, this.position.x, this.position.y);
      this.reset();
      this.score += this.board.sweep();
    } else {
      this.position.y++;
    }
    this.dropCounter = 0;
  }

  update(deltaTime)
  {
    this.move();

    // check if it is time to drop the current piece
    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.drop();
    }
  }

  draw(drawCallback) {
    // draw board
    this.board.draw(drawCallback);

    // draw player piece
    this.piece.matrix.forEach((row, i) => {
      row.forEach((value, j) => {
        if (value !== 0) {
          drawCallback(j + this.position.x, i + this.position.y, value);
        }        
      });
    });
  }
}



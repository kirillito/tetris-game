class Tetris {
  BOARD_WIDTH = 14;
  BOARD_HEIGHT = 24;
  
  TILE_COLORS = [
    '#000000',
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF'
  ];

  constructor(element) {
    this.element = element;
    this.canvas = element.querySelector('canvas');
    this.canvasContext = this.canvas.getContext('2d');

    let board = new Board(this.BOARD_WIDTH, this.BOARD_HEIGHT);
    this.player = new Player(board);

    let lastTime = 0;
    const update = (time = 0) => {
      const deltaTime = time - lastTime;
      lastTime = time;
    
      this.player.update(deltaTime);
      this.updateScore();
    
      // draw results
      this.draw();
      requestId = requestAnimationFrame(update);
    }

    update();
  }

  draw() {	
    // background
    drawRectangle(this.canvasContext,0,0,this.canvas.width,this.canvas.height,'black');
  
    // if(showingLoseScreen) {
    //   canvasContext.fillStyle = 'white';
  
    //   canvasContext.fillText("You're score: " + playerScore, 350, 200);
  
    //   canvasContext.fillText("click to continue", 350, 500);
    //   return;
    // } else if(showingWinScreen) {
    //   canvasContext.fillStyle = 'white';
  
    //   canvasContext.fillText("You Win! You're score: " + playerScore, 350, 200);
  
    //   canvasContext.fillText("click to continue", 350, 500);
    //   return;
    // }
  
    const drawCallback = this.drawGridTile.bind(this);
    this.player.draw(drawCallback);
  
    // canvasContext.fillStyle = 'white';
    // canvasContext.fillText("Score: " + playerScore, canvas.width - 100, 10)
  }

  drawGridTile(col, row, tileCode) {
    let tileWidth = Math.floor(this.canvas.width / this.BOARD_WIDTH);
    let tileHeight = Math.floor(this.canvas.height / this.BOARD_HEIGHT);

    drawRectangle(this.canvasContext, col*tileWidth, row*tileHeight, tileWidth, tileHeight, this.TILE_COLORS[tileCode]);
  }

  updateScore() {
    this.element.querySelector('.score').innerText = this.player.score;
  }

  serialize() {

  }

  deserialize() {
    
  }
}
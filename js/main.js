let canvas;
let canvasContext;

const FPS = 30;
const BOARD_WIDTH = 14;
const BOARD_HEIGHT = 24;

const TILE_COLORS = [
  '#000000',
  '#FF0D72',
  '#0DC2FF',
  '#0DFF72',
  '#F538FF',
  '#FF8E0D',
  '#FFE138',
  '#3877FF'
];

let showingLoseScreen = false;
let showingWinScreen = false;

let requestId;

let board = new Board(BOARD_WIDTH, BOARD_HEIGHT);
let player1 = new Player();

window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  // canvasContext.scale(20,20);

  this.initInput();
  this.loadImages(); 
  this.launchIfReady();
}

function launchIfReady() {
  if (imagesToLoad === 0) {
    startGame();
  }
}

function startGame() {
  player1.reset();
  updateScore();
  update();
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;

function update(time = 0) {
  player1.move();

  const deltaTime = time - lastTime;

  // check if it is time to move the current piece
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    player1.drop();
    dropCounter = 0;
  }
  lastTime = time;

  // draw results
  draw();
  updateScore();

  requestId = requestAnimationFrame(update);
}

function draw() {	
  // background
  drawRectangle(0,0,canvas.width,canvas.height,'black');

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

  board.draw()
  player1.draw()

  // canvasContext.fillStyle = 'white';
  // canvasContext.fillText("Score: " + playerScore, canvas.width - 100, 10)
}

function updateScore() {
  document.getElementById('playerScoreLabel').innerText = player1.score;
}
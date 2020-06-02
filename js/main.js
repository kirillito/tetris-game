let canvas;
let canvasContext;

const FPS = 30;

let showingLoseScreen = false;
let showingWinScreen = false;



window.onload = function() {
  canvas = document.getElementById('gameCanvas');
  canvasContext = canvas.getContext('2d');
  canvasContext.scale(20,20);

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
  update();
}

let dropCounter = 0;
let dropInterval = 1000;
let lastTime = 0;
function update(time = 0) {
  playerMove();

  const deltaTime = time - lastTime;

  // check if it is time to move the current piece
  dropCounter += deltaTime;
  if (dropCounter > dropInterval) {
    playerDrop();
  }
  lastTime = time;

  // draw results
  draw();
  requestAnimationFrame(update);
}

function draw() {	
  // background
  drawRectangle(0,0,canvas.width,canvas.height,'black');

  if(showingLoseScreen) {
    canvasContext.fillStyle = 'white';

    canvasContext.fillText("You're score: " + playerScore, 350, 200);

    canvasContext.fillText("click to continue", 350, 500);
    return;
  } else if(showingWinScreen) {
    canvasContext.fillStyle = 'white';

    canvasContext.fillText("You Win! You're score: " + playerScore, 350, 200);

    canvasContext.fillText("click to continue", 350, 500);
    return;
  }

  drawPiece(player.piece, player.pos);

  // canvasContext.fillStyle = 'white';
  // canvasContext.fillText("Score: " + playerScore, canvas.width - 100, 10)
}
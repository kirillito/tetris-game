const FPS = 30;

let showingLoseScreen = false;
let showingWinScreen = false;

let requestId;

const sessions = [];

window.onload = function() {
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
  const playerElements = document.querySelectorAll('.player');
  [...playerElements].forEach(element => {
      const tetris = new Tetris(element);
      sessions.push(tetris);
  });
}

let dropCounter = 0;
let dropInterval = 1000;




function updateScore() {
  document.getElementById('playerScoreLabel').innerText = player1.score;
}
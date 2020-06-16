let showingLoseScreen = false;
let showingWinScreen = false;

let requestId;

const tetrisManager = new TetrisManager(document);
const connectionManager = new ConnectionManager();

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
  const tetrisLocalGame = tetrisManager.createPlayer();
  tetrisLocalGame.element.classList.add('local');
  tetrisLocalGame.run();
  
  connectionManager.init(tetrisManager);
  connectionManager.connect('ws://localhost:9000');
}

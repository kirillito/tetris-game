const	KEY_DOWN_ARROW	= 40;
const	KEY_LEFT_ARROW	= 37;
const	KEY_RIGHT_ARROW	= 39;
const	KEY_UP_ARROW	= 38;
const	KEY_SPACE	= 32;

var	keyHeld_Drop	= false;
var	keyHeld_Left	= false;
var	keyHeld_Right	= false;
var	keyHeld_RotateLeft	= false;
var	keyHeld_RotateRight	= false;

function initInput() {
  document.addEventListener('keydown', keyPressed);
  document.addEventListener('keyup', keyReleased);
}

function keyPressed(e) {
  setKeyHoldState(e.keyCode, true);

  e.preventDefault();
}

function keyReleased(e) {
  setKeyHoldState(e.keyCode, false);
}

function setKeyHoldState(keyCode,	setTo) {
  if (keyCode === KEY_SPACE) {
    keyHeld_Drop	= setTo;
  }
  else if (keyCode === KEY_LEFT_ARROW) {
    keyHeld_Left	= setTo;
  }
  else if (keyCode === KEY_RIGHT_ARROW) {
    keyHeld_Right	= setTo;
  }
  else if (keyCode === KEY_DOWN_ARROW) {
    keyHeld_RotateLeft	= setTo;
  }
  else if (keyCode === KEY_UP_ARROW) {
    keyHeld_RotateRight	= setTo;
  }
}
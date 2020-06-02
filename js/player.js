const player = {
  pos: {x: 5, y: 5},
  piece: piecesMatrix,
  score: 0
}

function playerMove() {
  if (keyHeld_Left)	{
    player.pos.x--;
    keyHeld_Left = false;
  }
  if (keyHeld_Right)	{
    player.pos.x++;
    keyHeld_Right = false;
  }

}

function playerDrop() {
  player.pos.y++;
  dropCounter = 0;
}
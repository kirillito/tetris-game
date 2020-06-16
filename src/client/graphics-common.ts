// Common graphics functions

function drawRectangle(canvasContext, leftX, topY, width, height, drawColor) {
  canvasContext.fillStyle = drawColor;
  canvasContext.fillRect(leftX,topY,width,height);
}

function drawCircle(canvasContext, centerX, centerY, radius, color) {
  canvasContext.fillStyle = color;
  canvasContext.beginPath();
  canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true)
  canvasContext.fill();
}

function drawImageCenteredAtLocationWithRotation(canvasContext, graphic, x, y, angle) {
  canvasContext.save();
  canvasContext.translate(x,y);
  canvasContext.rotate(angle);	//	sets	the	rotation
  canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2);
  canvasContext.restore();
}
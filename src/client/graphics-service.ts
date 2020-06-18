// Common graphics functions

export default class GraphicsService {
  public static drawRectangle(canvasContext: CanvasRenderingContext2D, leftX: number, topY: number, width: number, height: number, drawColor: string) {
    canvasContext.fillStyle = drawColor;
    canvasContext.fillRect(leftX,topY,width,height);
  }
  
  public static drawCircle(canvasContext: CanvasRenderingContext2D, centerX: number, centerY: number, radius: number, color: string) {
    canvasContext.fillStyle = color;
    canvasContext.beginPath();
    canvasContext.arc(centerX, centerY, radius, 0, Math.PI*2, true)
    canvasContext.fill();
  }
  
  public static drawImageCenteredAtLocationWithRotation(canvasContext: CanvasRenderingContext2D, graphic: CanvasImageSource, x: number, y: number, angle: number) {
    canvasContext.save();
    canvasContext.translate(x,y);
    canvasContext.rotate(angle);	//	sets	the	rotation
    canvasContext.drawImage(graphic,-graphic.width/2,-graphic.height/2);
    canvasContext.restore();
  }
}
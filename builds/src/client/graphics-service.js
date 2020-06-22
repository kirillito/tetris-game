"use strict";
// Common graphics functions
Object.defineProperty(exports, "__esModule", { value: true });
var GraphicsService = /** @class */ (function () {
    function GraphicsService() {
    }
    GraphicsService.drawRectangle = function (canvasContext, leftX, topY, width, height, drawColor) {
        canvasContext.fillStyle = drawColor;
        canvasContext.fillRect(leftX, topY, width, height);
    };
    GraphicsService.drawCircle = function (canvasContext, centerX, centerY, radius, color) {
        canvasContext.fillStyle = color;
        canvasContext.beginPath();
        canvasContext.arc(centerX, centerY, radius, 0, Math.PI * 2, true);
        canvasContext.fill();
    };
    GraphicsService.drawImageCenteredAtLocationWithRotation = function (canvasContext, graphic, x, y, angle) {
        canvasContext.save();
        canvasContext.translate(x, y);
        canvasContext.rotate(angle); //	sets	the	rotation
        canvasContext.drawImage(graphic, -graphic.width / 2, -graphic.height / 2);
        canvasContext.restore();
    };
    return GraphicsService;
}());
exports.default = GraphicsService;
//# sourceMappingURL=graphics-service.js.map
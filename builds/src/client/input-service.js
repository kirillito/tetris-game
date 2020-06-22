"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var InputService = /** @class */ (function () {
    function InputService() {
        this.KEY_DOWN_ARROW = 40;
        this.KEY_LEFT_ARROW = 37;
        this.KEY_RIGHT_ARROW = 39;
        this.KEY_UP_ARROW = 38;
        this.KEY_SPACE = 32;
        this.keyHeld_Drop = false;
        this.keyHeld_Left = false;
        this.keyHeld_Right = false;
        //public keyHeld_RotateLeft: boolean	= false;
        this.keyHeld_RotateRight = false;
    }
    InputService.prototype.init = function () {
        var keyPressedCallback = this.keyPressed.bind(this);
        var keyReleasedCallback = this.keyReleased.bind(this);
        document.addEventListener('keydown', keyPressedCallback);
        document.addEventListener('keyup', keyReleasedCallback);
    };
    InputService.prototype.keyPressed = function (e) {
        e.preventDefault();
        this.setKeyHoldState(e.keyCode, true);
    };
    InputService.prototype.keyReleased = function (e) {
        e.preventDefault();
        this.setKeyHoldState(e.keyCode, false);
    };
    InputService.prototype.setKeyHoldState = function (keyCode, setTo) {
        if (keyCode === this.KEY_SPACE) {
            this.keyHeld_Drop = setTo;
        }
        else if (keyCode === this.KEY_LEFT_ARROW) {
            this.keyHeld_Left = setTo;
        }
        else if (keyCode === this.KEY_RIGHT_ARROW) {
            this.keyHeld_Right = setTo;
        }
        else if (keyCode === this.KEY_DOWN_ARROW) {
            this.keyHeld_Drop = setTo;
        }
        else if (keyCode === this.KEY_UP_ARROW) {
            this.keyHeld_RotateRight = setTo;
        }
    };
    return InputService;
}());
exports.default = InputService;
//# sourceMappingURL=input-service.js.map
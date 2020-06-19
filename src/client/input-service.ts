export default class InputService {
  private	KEY_DOWN_ARROW: number	= 40;
  private	KEY_LEFT_ARROW: number	= 37;
  private	KEY_RIGHT_ARROW: number	= 39;
  private	KEY_UP_ARROW: number	= 38;
  private	KEY_SPACE: number	= 32;
  
  public keyHeld_Drop: boolean	= false;
  public keyHeld_Left: boolean	= false;
  public keyHeld_Right: boolean	= false;
  public keyHeld_RotateLeft: boolean	= false;
  public keyHeld_RotateRight: boolean	= false;
  
  constructor() {    
  }

  public init() {
    const keyPressedCallback = this.keyPressed.bind(this);
    const keyReleasedCallback = this.keyReleased.bind(this);

    document.addEventListener('keydown', keyPressedCallback);
    document.addEventListener('keyup', keyReleasedCallback);
  }
  
  private keyPressed(e: KeyboardEvent): void {
    e.preventDefault();
    this.setKeyHoldState(e.keyCode, true);
  }
  
  private keyReleased(e: KeyboardEvent): void {
    e.preventDefault();
    this.setKeyHoldState(e.keyCode, false);
  }
  
  private setKeyHoldState(keyCode: number,	setTo: boolean): void {
    if (keyCode === this.KEY_SPACE) {
      this.keyHeld_Drop	= setTo;
    }
    else if (keyCode === this.KEY_LEFT_ARROW) {
      this.keyHeld_Left	= setTo;
    }
    else if (keyCode === this.KEY_RIGHT_ARROW) {
      this.keyHeld_Right	= setTo;
    }
    else if (keyCode === this.KEY_DOWN_ARROW) {
      this.keyHeld_RotateLeft	= setTo;
    }
    else if (keyCode === this.KEY_UP_ARROW) {
      this.keyHeld_RotateRight	= setTo;
    }
  }
}
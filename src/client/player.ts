import { Coordinates } from "../shared/models";

import Board from "./board";
import Piece from "./piece";
import InputService from "./input-service";

export default class Player {
  private DROP_SLOW: number = 1000;
  private DROP_FAST: number = 50;

  public board: Board;
  public piece: Piece;
  public position: Coordinates;
  public score: number;

  private inputService: InputService = null
  private dropCounter: number = 0;
  private dropInterval: number = this.DROP_SLOW;

  constructor(board: Board) {
    //TODO:
    //this.events = new Events();

    this.inputService = new InputService();
    this.inputService.init();

    this.board = board;

    this.dropCounter = 0;
    this.dropInterval = this.DROP_SLOW;

    this.score = 0;
    this.reset();
  }

  private reset(): void {
    this.piece = new Piece();;
    let y = 0;
    let x = (this.board.width / 2 || 0) - (Math.floor(this.piece.matrix[0].length / 2));
    this.position = {x, y};

    if (this.board.isColliding(this.piece.matrix, this.position.x, this.position.y)) {
      this.board.clear();
      this.score = 0;
      
      //TODO
      //this.events.emit('score', this.score);
    }

    //TODO
    //this.events.emit('position', this.position);
    //this.events.emit('piece', this.piece);
  }
  
  public update(deltaTime: number): void
  {
    this.move();

    // check if it is time to drop the current piece
    this.dropCounter += deltaTime;
    if (this.dropCounter > this.dropInterval) {
      this.drop();
    }
  }

  private move() {
    if (this.inputService.keyHeld_Left)	{
      if (!this.board.isColliding(this.piece.matrix, this.position.x-1, this.position.y)) {
        this.position.x--;
        //TODO
        //this.events.emit('position', this.position);
      }
      this.inputService.keyHeld_Left = false;
    }
    if (this.inputService.keyHeld_Right)	{
      if (!this.board.isColliding(this.piece.matrix, this.position.x+1, this.position.y)) {
        this.position.x++;
        //TODO
        //this.events.emit('position', this.position);
      }
      this.inputService.keyHeld_Right = false;
    }
    if (this.inputService.keyHeld_Drop)	{
      this.drop();
      //TODO
      //this.events.emit('position', this.position);
      this.inputService.keyHeld_Drop = false;
    }
    if (this.inputService.keyHeld_RotateLeft)	{
      this.rotate(1);  
      //TODO
      //this.events.emit('piece', this.piece);
      this.inputService.keyHeld_RotateLeft = false;
    }
    if (this.inputService.keyHeld_RotateRight)	{
      this.rotate(-1);
      //TODO
      //this.events.emit('piece', this.piece);
      this.inputService.keyHeld_RotateRight = false;
    }
  
  }

  private rotate(direction: number): void {
    let previousX = this.position.x;
    let offset = 1;
    this.piece.rotate(direction);
    
    while (this.board.isColliding(this.piece.matrix, this.position.x, this.position.y)) {
      this.position.x += offset;
      offset = -(offset + (offset > 0 ? 1 : -1));
      if (offset > this.piece.matrix[0].length) {
        this.piece.rotate(-direction);
        this.position.x = previousX;
        return;
      }
    }
  }

  private drop() {
    this.dropCounter = 0;
    if (this.board.isColliding(this.piece.matrix, this.position.x, this.position.y+1)) {
      this.board.merge(this.piece.matrix, this.position.x, this.position.y);
      this.reset();
      this.score += this.board.sweep();

      //TODO
      //this.events.emit('score', this.score);
    } else {
      this.position.y++;
    }
    //TODO
    //this.events.emit('position', this.position);
  }

  public draw(drawCallback: CallableFunction): void {
    // draw board
    this.board.draw(drawCallback);

    // draw player piece
    this.piece.matrix.forEach((row, i) => {
      row.forEach((value, j) => {
        if (value !== 0) {
          drawCallback(j + this.position.x, i + this.position.y, value);
        }        
      });
    });
  }
}



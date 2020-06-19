import Board from "./board";
import Player from "./player";
import GraphicsService from "./graphics-service";

export default class Tetris {
  private BOARD_WIDTH: number = 14;
  private BOARD_HEIGHT: number = 24;  
  private TILE_COLORS: Array<string> = [
    '#000000',
    '#FF0D72',
    '#0DC2FF',
    '#0DFF72',
    '#F538FF',
    '#FF8E0D',
    '#FFE138',
    '#3877FF'
  ];

  public element: Element;
  private canvas: HTMLCanvasElement;
  private canvasContext: CanvasRenderingContext2D;
  private requestId: number;
  private lastTimeUpdated: number;

  private player: Player;

  constructor(element: Element) {
    this.element = element;
    this.canvas = element.querySelector('canvas');
    this.canvasContext = this.canvas.getContext('2d');

    let board = new Board(this.BOARD_WIDTH, this.BOARD_HEIGHT);
    this.player = new Player(board);

    // TODO:
    // this.player.events.listen('score', score => {
    //   this.updateScore(score);
    // });

    this.lastTimeUpdated = 0;
    this.updateScore(0);
  }

  public run() {
    this.update();
  }

  private update(time: number = 0): void {
    const deltaTime = time - this.lastTimeUpdated;
    this.lastTimeUpdated = time;
  
    this.player.update(deltaTime);
  
    // draw results
    this.draw();

    const updateCallback = this.update.bind(this)
    this.requestId = requestAnimationFrame(updateCallback);
  }

  public draw() {	
    // background
    GraphicsService.drawRectangle(this.canvasContext,0,0,this.canvas.width,this.canvas.height,'black');
    
    const drawCallback = this.drawGridTile.bind(this);
    this.player.draw(drawCallback);
  }

  private drawGridTile(col: number, row: number, tileCode: number) {
    let tileWidth = Math.floor(this.canvas.width / this.BOARD_WIDTH);
    let tileHeight = Math.floor(this.canvas.height / this.BOARD_HEIGHT);

    GraphicsService.drawRectangle(this.canvasContext, col*tileWidth, row*tileHeight, tileWidth, tileHeight, this.TILE_COLORS[tileCode]);
  }

  private updateScore(score: number) {
    let scoreElement = <HTMLElement>this.element.querySelector('.score');
    scoreElement.innerText = score.toString();
  }

  // TODO:
  // serialize() {
  //   return {
  //     board: {
  //       grid: this.player.board.grid,
  //     },
  //     player: {
  //       piece: this.player.piece,
  //       position: this.player.position,
  //       score: this.player.score
  //     }
  //   };
  // }

  // deserialize(state) {
  //   this.player.board.grid = Object.assign(state.board.grid);
  //   this.player.piece.matrix = Object.assign(state.player.piece.matrix);
  //   this.player.score = state.player.score;
  //   this.updateScore(this.player.score);
  //   this.draw();
  // }
}
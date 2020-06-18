import Tetris from "./tetris";

export default class TetrisManager {
  private document: Document;
  private template: HTMLTemplateElement;
  private instances: Array<Tetris>;

  constructor(document: Document) {
    this.document = document;
    this.template = this.document.querySelector('#player-template');

    this.instances = [];
  }

  createPlayer(): Tetris {
    const element = document.importNode(this.template.content, true).children[0];

    const tetris = new Tetris(element);

    this.document.body.appendChild(tetris.element);

    this.instances.push(tetris);

    return tetris;
  }

  removePlayer(tetris: Tetris) {
    this.document.body.removeChild(tetris.element);

    this.instances = this.instances.filter(instance => instance !== tetris);
  }

  sortPlayers(sessions: Array<Tetris>) {
    sessions.forEach((tetris: Tetris) => {
      this.document.body.appendChild(tetris.element);
    });
  }
}
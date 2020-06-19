import * as io from "socket.io-client";

//import { GameEvent, PlayerEvent } from "../shared/events.model";
import {
  Window,
  Coordinates,
  Player as PlayerType,
} from "../shared/models";
import Player from "./player";
import TetrisManager from "./tetris-manager";
//import ConnectionManager from "./connection-manager";

declare const window: Window;

export class TetrisGame {
  private players: Array<Player>;
  private player: Player;

  private tetrisManager: TetrisManager;
//TODO
//    private connectionManager: ConnectionManager;

  constructor(document: Document) {
    let socketUrl = '';
    if(document.location.href.indexOf("localhost") != -1) {  
      socketUrl = "http://localhost:3000";
    }
    window.socket = io(socketUrl);

    this.tetrisManager = new TetrisManager(document);
//TODO
//        this.connectionManager = new ConnectionManager();
    this.startGame();

  }

  private startGame() {
    const tetrisLocalGame = this.tetrisManager.createPlayer();
    tetrisLocalGame.element.classList.add('local');
    tetrisLocalGame.run();

//TODO
    // connectionManager.init(tetrisManager);
    // connectionManager.connect('ws://localhost:9000');
  }
/*
    protected manageAssets(): void {
        this.pla = [];
        this.comets = [];
        window.socket.on(PlayerEvent.joined, (player: SpaceShip) => {
            this.actors.push(new Player(game, player, "shooter-sprite-enemy"));
        });

        window.socket.on(PlayerEvent.protagonist, (player: SpaceShip) => {
            this.actor = new Player(game, player, "shooter-sprite");
            this.actors.push(this.actor);
        });

        window.socket.on(PlayerEvent.players, (players: SpaceShip[]) => {
            players.map(player => {
                const enemy = new Player(game, player, "shooter-sprite-enemy");
                if (player.ammo) {
                    enemy.assignPickup(game, enemy);
                }
                this.actors.push(enemy);
            });
        });

        window.socket.on(PlayerEvent.quit, (playerId: string) => {
            this.actors
                .filter(actor => actor.player.id === playerId)
                .map(actor => actor.player.kill());
        });

        window.socket.on(GameEvent.drop, (coors: Coordinates) => {
            if (this.projectile) {
                this.projectile.pickup.item.kill();
            }
            this.projectile = new Projectile(game);
            this.projectile.renderPickup(coors);
        });

        window.socket.on(PlayerEvent.hit, (enemyId: string) => {
            this.actors
                .filter(() => this.actor.player.id === enemyId)
                .map(() => window.location.reload(true));
        });

        window.socket.on(PlayerEvent.coordinates, (player: PlayerType) => {
            this.actors.filter((actor: Player) => {
                if (actor.player.id === player.player.id) {
                    actor.player.x = player.coors.x;
                    actor.player.y = player.coors.y;
                    actor.player.rotation = player.coors.r;

                    if (actor.projectile) {
                        actor.hud.update(player.coors.a);
                    }

                    if (player.coors.f) {
                        actor.projectile.fireWeapon();
                    }

                    if (player.coors.m) {
                        actor.player.animations.play("accelerating");
                    }
                }
            });
        });
    }

    protected update(): void {

        if (this.actor && this.actor.controls) {
            this.actor.view();

            window.socket.emit(PlayerEvent.coordinates, {
                x: this.actor.player.position.x,
                y: this.actor.player.position.y,
                r: this.actor.player.rotation,
                f: this.actor.playerState.get("fire"),
                m: this.actor.playerState.get("moving"),
                a: this.actor.playerState.get("ammo"),
            });

            game.physics.arcade.collide(
                this.actor.player,
                this.actors.map(actor => actor.player)
            );

            if (this.actor.projectile) {
                game.physics.arcade.collide(
                    this.actor.projectile.weapon.bullets,
                    this.actors.map(actor => actor.player),
                    (
                        enemy: Phaser.Sprite & Player,
                        projectile: Phaser.Sprite
                    ) => {
                        if (enemy.id !== this.actor.player.id) {
                            window.socket.emit(PlayerEvent.hit, enemy.id);
                            projectile.kill();
                            enemy.destroy();
                        }
                    }
                );
            }
        }
    }
    */
}
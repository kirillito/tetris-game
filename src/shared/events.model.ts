export class GameEvent {
  public static readonly authentication: string = "game:authentication";
  public static readonly start: string = "game:start";
}

export class ServerEvent {
  public static readonly connected: string = "connection";
  public static readonly disconnected: string = "disconnect";
}

export class PlayerEvent {
  public static readonly players: string = "player:players";
  public static readonly joined: string = "player:joined";
  public static readonly left: string = "player:left";
  public static readonly position: string = "player:position";
  public static readonly piece: string = "player:piece";
  public static readonly score: string = "player:score";
  public static readonly board: string = "player:board";
}
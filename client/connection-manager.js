class ConnectionManager {
  constructor(tetrisManager) {
    this.connection = null;
    this.players = new Map();
    this.tetrisManager = null;
  }

  init(tetrisManager) {
    this.tetrisManager = tetrisManager;
    this.localGame = tetrisManager.instances[0];
  }

  connect(address) {
    this.connection = new WebSocket(address);

    this.connection.addEventListener('open', () => {
      console.log('Connection established!');
      this.initSession();
      this.listenToEvents();
    });

    this.connection.addEventListener('message', event => {
      console.log('Received message', event.data);
      this.receive(event.data);
    });
  }

  initSession() {
    const sessionId = window.location.hash.split('#')[1];
    this.localGame = this.tetrisManager.instances[0];
    const state = this.localGame.serialize();

    if (sessionId) {
      this.send({
        type: 'join-session',
        id: sessionId,
        state
      });
    } else {
      this.send({
        type: 'create-session',
        state
      });
    }
  }

  listenToEvents() {
    const localGame = this.tetrisManager.instances[0];

    const player = localGame.player;
//    ['position', 'piece', 'score'].forEach(key = > {
//      player.events
//    });
  }

  updateManager(peers) {
    const myId = peers.you;

    const clients = peers.clients.filter(client => client.id !== myId);
    clients.forEach(client => {
      // new player
      if (!this.players.has(client.id)) {
        const tetris = this.tetrisManager.createPlayer();
        tetris.parse(client.state);
        this.players.set(client.id, tetris);
      }
    });

    // if in current game there are players that are missing in broadcasted data - remove them
    [...this.players.entries()].forEach(([id, tetris]) => {
      if (!clients.some(client => client.id === id)) {
        this.tetrisManager.removePlayer(tetris);
        this.players.delete(id);
      }
    });

    this.localGame = this.tetrisManager.instances[0];
    const sorted = peers.clients.map(client => this.players.get(client.id || localGame));
    this.tetrisManager.sortPlayers(sorted);
  }

  updatePlayer(id, fragment, [key, value]) {

  }

  receive(msg) {
    const data = JSON.parse(msg);
    if (data.type === 'session-created') {
      window.location.hash = data.id;
    } else if (data.type === 'session-broadcast') {
      this.updateManager(data.peers);
    } else if (data.type === 'state-update') {
      this.updatePlayer(data.clientId, data.fragment, data.state);
    }
    console.log(data);
  }

  send(data) {
    const msg = JSON.stringify(data);
    console.log('Sending Message:', msg);
    this.connection.send(msg);
  }
}
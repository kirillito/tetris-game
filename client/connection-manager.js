class ConnectionManager {
  constructor() {
    this.connection = null;
  }

  init(tetrisManager) {
    this.localGame = tetrisManager.instances[0];
  }

  connect(address) {
    this.connection = new WebSocket(address);
  }

  receive(msg) {
    const data = JSON.parse(msg);
    console.log(data);
  }

  send(data) {
    const msg = JSON.stringify(data);
    console.log('Sending Message:', msg);
    this.connection.send(msg);
  }
}
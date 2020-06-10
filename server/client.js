class Client {
  constructor(connection, id) {
    this.connection = connection;
    this.id = id;
    this.session = null;

    this.state = {};
  }
  
  send(msg) {

  }
}

module.exports = Client;
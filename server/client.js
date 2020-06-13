class Client {
  constructor(connection, id) {
    this.connection = connection;
    this.id = id;
    this.session = null;

    this.state = {
      board: {
        grid: []
      },
      player: {
        piece: {

        },
        position: {
          x: 0,
          y: 0
        },
        score: 0
      }
    };
  }

  broadcast(data) {
    if (!this.session) {
      throw new Error('Cannot broacast without active session!')
    }

    data.clientId = this.id;

    [...this.session.clients].filter(client => client !== this).forEach(client => client.send(data));
  }
  
  send(data) {
    const msg = JSON.stringify(data);
    console.log(`Sending message ${msg}`);
    this.connection.send(msg, (err) => {
      if (err) {
        console.log('Error sending message', msg, err);
      }
    });
  }
}

module.exports = Client;
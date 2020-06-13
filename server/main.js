const WebSocketServer = require('ws').Server;
const Session = require('./session');
const Client = require('./client');

const server = new WebSocketServer({port: 9000});
console.log('Server is running...');

const sessions = new Map();

function createId(length = 6, charSet='abcdefghjkmnopqrstvwxyz01234567890') {
  let id = '';

  while (length--) {
    id += charSet[Math.random()*charSet.length | 0];
  }

  return id;
}

function createClient(connection, id = createId()) {
  return new Client(connection, id);
}

function createSession(id = createId()) {
  if (sessions.has(id)) {
    throw new Error(`Session ${id} already exists!`);
  }

  const session = new Session(id);
  console.log('Creating new session', session);

  sessions.set(id, session);
  return session;
}

function getSession(id) {
  return sessions.get(id);
}

function broadcastSession(session) {
  const clients = [...session.clients];
  clients.forEach(client => {
    client.send({
      type: 'session-broadcast',
      peers: {
        you: client.id,
        clients: clients.map(clientPeer => {
          return {
            id: clientPeer.id,
            state: clientPeer.state
          };
        })
      }
    });
  });
}

server.on('connection', connection => {
  console.log('Connection established');
  const client = createClient(connection);

  connection.on('message', msg => {
    console.log('Message received', msg);
    const data = JSON.parse(msg);

    if (data.type === 'create-session') {
      const session = createSession();
      session.join(client);

      client.state = data.state;
      client.send({
        type: 'session-created',
        id: session.id
      });
    } else if (data.type === 'join-session') {
      const session = getSession(data.id);
      session.join(client);

      client.state = data.state;
      broadcastSession(session);
    } else if (data.type === 'state-update') {
      const [key, value] = data.state;

      client.state[data.fragment][key] = value;
      client.broadcast(data);
    }
  });

  connection.on('close', () => {
    console.log('Connection closed');
    const session = client.session;
  
    if (session) {
      session.leave(client);
      if (session.clients.size === 0) {
        sessions.delete(session.id);
      }
    }

    broadcastSession(session);

    console.log(sessions);
  });
});
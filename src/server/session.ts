// import { Client } from "./client";

// export class Session {
//   id: string;
//   clients: Set<Client>;

//   constructor(id: string) {
//     this.id = id;
//     this.clients = new Set();
//   }

//   join(client: Client) {
//     if (client.session) {
//       throw new Error('Client already in session');
//     }
//     this.clients.add(client);
//     client.session = this;
//   }

//   leave(client: Client) {
//     if (client.session !== this) {
//       throw new Error('Client not in session');
//     }
//     this.clients.delete(client);
//     client.session = null;
//   }
// }
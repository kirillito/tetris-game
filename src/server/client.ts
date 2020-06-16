
// import { Session } from "./session";

// export class Client {
//   connection: any;
//   id: string;
//   session: Session;

//   constructor(connection: any, id: string) {
//     this.connection = connection;
//     this.id = id;
//     this.session = null;

//     this.state = {
//       board: {
//         grid: []
//       },
//       player: {
//         piece: {
//           matrix: []
//         },
//         position: {
//           x: 0,
//           y: 0
//         },
//         score: 0
//       }
//     };
//   }

//   broadcast(data: { clientId: string; }) {
//     if (!this.session) {
//       throw new Error('Cannot broacast without active session!')
//     }

//     data.clientId = this.id;

//     [...this.session.clients]
//       .filter(client => client !== this)
//       .forEach(client => client.send(data));
//   }
  
//   send(data: { type: string; id: string; }) {
//     const msg = JSON.stringify(data);
//     //console.log(`Sending message ${msg}`);
//     this.connection.send(msg, (err: any) => {
//       if (err) {
//         console.log('Error sending message', msg, err);
//       }
//     });
//   }
// }
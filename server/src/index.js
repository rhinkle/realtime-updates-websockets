const websocketPort = 8000;
const websocket = require("websocket").server
const http = require("http");
const faker = require("faker");

const server = http.createServer();
server.listen(websocketPort);
console.log(`listening on port ${websocketPort}`);

const wsServer = new websocket({
    httpServer: server
});

const clients = {};
function newLunchOrder() {
    return {
        name: faker.name.firstName(),
        lunchOrderId: faker.random.alphaNumeric(10)
    }
}

// This code generates unique userid for every-user.
const getUniqueID = () => {
    const s4 = () => Math.floor((1 + Math.random()) * 0x10000).toString(16).substring(1);
    return s4() + s4() + '-' + s4();
  };


wsServer.on('request', (request) => {
    const userId = getUniqueID();
    const connection = request.accept(null, request.origin);
    console.log((new Date()) + ' Received a new connection from origin ' + request.origin + '.');

    clients[userId] = connection
    console.log('connected: ' + userId);

    const defaultMsg = () => {
        return {
            type: "message",
            lead: newLunchOrder()
        };
    };

    setInterval(() => {
        for(let key in clients) {
            clients[key].send(JSON.stringify(defaultMsg()));
        }
    }, 10000);

    connection.on('message', function(message) {
        if (message.type === 'utf8') {
          console.log('Received Message: ', message.utf8Data);
    
          // broadcasting message to all connected clients
          // for(let key in clients) {
          //   clients[key].sendUTF(message.utf8Data);
          //   console.log('sent Message to: ', key);
          // }
        }
      })
    connection.on('close', () => {
        console.log("closed connections");
        delete clients[userId];
    })
});


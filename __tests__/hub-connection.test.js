const { Server } = require('socket.io');
const { io } = require('socket.io-client');
const http = require('http');
const Chance = require('chance');
const chance = new Chance();

let server, clientSocket, capsNamespace;

beforeAll((done) => {
  const app = http.createServer();
  server = new Server(app);
  capsNamespace = server.of('/caps');

  capsNamespace.on('connection', (socket) => {
    socket.on('pickup', (payload) => {
      capsNamespace.emit('pickup', payload);
    });
    socket.on('in-transit', (payload) => {
      capsNamespace.emit('in-transit', payload);
    });
    socket.on('delivered', (payload) => {
      capsNamespace.emit('delivered', payload);
    });
  });

  app.listen(() => {
    clientSocket = io(`http://localhost:${app.address().port}/caps`);
    clientSocket.on('connect', done);
  });
});

afterAll(() => {
  clientSocket.close();
  server.close();
});

test('should handle pickup, in-transit, and delivered events', (done) => {
  const payload = {
    store: '1-800-flowers',
    orderId: chance.guid(),
    customer: chance.name(),
    address: `${chance.city()}, ${chance.state()}`,
  };

  clientSocket.emit('pickup', payload);

  clientSocket.on('pickup', (receivedPayload) => {
    expect(receivedPayload).toEqual(payload);
    clientSocket.emit('in-transit', payload);
  });

  clientSocket.on('in-transit', (receivedPayload) => {
    expect(receivedPayload).toEqual(payload);
    clientSocket.emit('delivered', payload);
  });

  clientSocket.on('delivered', (receivedPayload) => {
    expect(receivedPayload).toEqual(payload);
    done();
  });
});

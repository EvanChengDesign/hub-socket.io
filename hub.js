'use strict';

require('dotenv').config();
const { Server } = require('socket.io');
const io = new Server(3000);

const caps = io.of('/caps');

// Function to handle the 'pickup' event
function handlePickup(payload, socket) {
  console.log('The pickup was requested', payload.orderId);
  // Broadcast the pickup event to all clients except the sender
  socket.broadcast.emit('pickup', payload);
}

function handleInTransit(payload) {
  console.log(`Order ${payload.orderId} is in-transit`);
  // Broadcast the in-transit event to all clients
  caps.emit('in-transit', payload);
}

function handleDelivered(payload) {
  console.log(`Order ${payload.orderId} has been delivered`);
  // Broadcast the delivered event to all clients
  caps.emit('delivered', payload);
}

// Function to handle connection events in the 'caps' namespace
function handleConnection(socket) {
  console.log('A client has connected to the caps namespace');

  socket.on('pickup', (payload) => {
    handlePickup(payload, socket);
  });

  socket.on('in-transit', handleInTransit);
  socket.on('delivered', handleDelivered);
}

// Function to start the server
function startServer() {
  console.log('The server has been started');
  caps.on('connection', handleConnection);
}

startServer();

module.exports = { handleConnection, startServer };

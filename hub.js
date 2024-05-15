'use strict';

require('dotenv').config();
const http = require('http');
const { Server } = require('socket.io');
const express = require('express');
const app = express();

// Create an HTTP server
const server = http.createServer(app);

// Initialize Socket.IO server on the HTTP server
const io = new Server(server);

// Namespace for CAPS
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

// Start the server
startServer();

// Define the port from environment variables or use 3000 as default
const PORT = process.env.PORT || 3000;

// Listen on the defined port
server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});

module.exports = { handleConnection, startServer };

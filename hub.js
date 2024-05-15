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
function handlePickup(payload) {
  console.log(`The pickup was requested: ${JSON.stringify(payload)}`);
  // Broadcast the pickup event to all clients in the /caps namespace
  caps.emit('pickup', payload);
}

// Function to handle the 'in-transit' event
function handleInTransit(payload) {
  console.log(`Order ${payload.orderId} is in-transit`);
  // Broadcast the in-transit event to all clients in the /caps namespace
  caps.emit('in-transit', payload);
}

// Function to handle the 'delivered' event
function handleDelivered(payload) {
  console.log(`Order ${payload.orderId} has been delivered`);
  // Broadcast the delivered event to all clients in the /caps namespace
  caps.emit('delivered', payload);
}

// Function to handle connection events in the 'caps' namespace
function handleConnection(socket) {
  console.log('A client has connected to the caps namespace');

  socket.on('pickup', (payload) => {
    console.log('Pickup event received:', payload);
    handlePickup(payload);
  });

  socket.on('in-transit', (payload) => {
    console.log('In-transit event received:', payload);
    handleInTransit(payload);
  });

  socket.on('delivered', (payload) => {
    console.log('Delivered event received:', payload);
    handleDelivered(payload);
  });
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

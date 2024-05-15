'use strict';

require('dotenv').config();
const { io } = require('socket.io-client');
const CAPS_URL = process.env.RENDER_URL || 'http://localhost:3000/caps';
const socket = io(CAPS_URL);

socket.on('connect', () => {
  console.log('Driver connected to CAPS namespace');
});

socket.on('pickup', (payload) => {
  console.log('Received pickup event', payload);

  setTimeout(() => {
    console.log('Driver has picked up package');
    socket.emit('in-transit', payload);
  }, 1000);

  setTimeout(() => {
    console.log('Package has been delivered');
    socket.emit('delivered', payload);
  }, 2000);
});

socket.on('disconnect', () => {
  console.log('Driver disconnected from CAPS namespace');
});

module.exports = {};

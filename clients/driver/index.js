'use strict';

require('dotenv').config();
const { io } = require('socket.io-client');
const CAPS_URL = process.env.RENDER_URL || 'http://localhost:3000/caps';
const socket = io(CAPS_URL);

socket.on('connect', () => {
  console.log('Driver connected to CAPS namespace');
});

socket.on('pickup', (payload) => {
  console.log('Received pickup event:', payload);

  setTimeout(() => {
    console.log('Driver has picked up package', payload.orderId);
    socket.emit('in-transit', payload);
  }, 5000); // Reduced delay for better testing visibility

  setTimeout(() => {
    console.log('Package has been delivered', payload.orderId);
    socket.emit('delivered', payload);
  }, 10000);
});

socket.on('disconnect', () => {
  console.log('Driver disconnected from CAPS namespace');
});

module.exports = {};

'use strict';

require('dotenv').config();
const { io } = require('socket.io-client');
const { generateOrder } = require('./handler.js');
const CAPS_URL = process.env.RENDER_URL || 'http://localhost:3000/caps';
const socket = io(CAPS_URL);

socket.on('connect', () => {
  console.log('Vendor connected to CAPS namespace');
});

setInterval(() => {
  generateOrder(socket);
}, 10000);

module.exports = {};

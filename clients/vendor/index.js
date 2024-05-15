'use strict';

require ('dotenv').config();
const {io} = require('socket.io-client');
const { generateOrder } = require('./handler.js');
// const socket = io(process.env.RENDER_URL);
const socket = io('http://localhost:3000/caps');


setInterval(() => {
  generateOrder(socket);
}, 10000);
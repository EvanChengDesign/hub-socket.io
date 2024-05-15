'use strict';

const Chance = require('chance');
const chance = new Chance();


const generateOrder = (socket, payload = null) => {
  if (!payload) {
    payload = {
      store: '1-800-flowers',
      orderId: chance.guid(),
      customer: chance.name(),
      address: `${chance.city()}, ${chance.state()}`,
    };
  }
  console.log('Order is ready to be picked up');
  socket.emit('pickup', payload);


    
};

module.exports = {generateOrder};
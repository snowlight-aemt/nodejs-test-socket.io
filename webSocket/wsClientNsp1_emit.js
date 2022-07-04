const io = require('socket.io-client');
require('dotenv').config();

const { makeURLFormat } = require('../common');


const nsp1 = io(makeURLFormat(process.env.HOST, process.env.PORT) + '/nsp1');

nsp1.on('connect', (socket) => {
    console.log('connection server');
    
    nsp1.emit('message', 'message');
});

nsp1.on('message', (msg) => {
    console.log(msg);
});
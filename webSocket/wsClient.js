const io = require('socket.io-client');
require('dotenv').config();

const { makeURLFormat } = require('../common');


const socketClient = io(makeURLFormat(process.env.HOST, process.env.PORT));

socketClient.on('connect', (value) => {
    console.log('connection server');
});

socketClient.on('message', (msg) => {
    console.log(msg);
});
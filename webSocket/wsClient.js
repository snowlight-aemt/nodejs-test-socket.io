const io = require('socket.io-client');
const { createURL } = require('../common');
require('dotenv').config();

const socketClient = io(createURL(process.env.HOST, process.env.PORT));

socketClient.on('connect', (value) => {
    console.log('connection server');
});

socketClient.on('message', (msg) => {
    console.log(msg);
});
const io = require('socket.io-client');
require('dotenv').config();

const { createURL } = require('../common');


const socketClient = io(createURL(process.env.HOST, process.env.PORT));

socketClient.on('connect', (value) => {
    console.log('connection server');
});

socketClient.on('message', (msg) => {
    console.log(msg);
});
const io = require('socket.io-client');

const socketClient = io('http://localhost:3000');

socketClient.on('connect', (value) => {
    console.log('connection server');
});

socketClient.on('message', (msg) => {
    console.log(msg);
});
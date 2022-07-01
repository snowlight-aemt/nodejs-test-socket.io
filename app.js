const { run } = require('./kafka/consumer');
const io = require('socket.io-client');
const socketClient = io('http://localhost:3000');

run(({topic, partition, message}) => {
    socketClient.on('connect', (value) => {
        console.log('connection server');
    });

    socketClient.emit('message', message.value.toString());
    return message.value.toString;
}).catch(e => {
    console.error(`Kafka Consummer Exception`, e);
});
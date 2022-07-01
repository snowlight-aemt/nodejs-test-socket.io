const io = require('socket.io-client');

const { run } = require('./kafka/consumer');
const { createURL } = require('./common');


const socketClient = io(createURL(process.env.HOST, process.env.PORT));

run(({topic, partition, message}) => {
    socketClient.on('connect', (value) => {
        console.log('connection server');
    });

    socketClient.emit('message', message.value.toString());
    return message.value.toString;
}).catch(e => {
    console.error(`Kafka Consummer Exception`, e);
});
const io = require('socket.io-client');

const { run } = require('./kafka/consumer');
const { makeURLFormat } = require('./common');


const socketClient = io(makeURLFormat(process.env.HOST, process.env.PORT) + '/nsp1');

socketClient.on('connect', (value) => {
    console.log('app connection server');
});

socketClient.on('message', (message) => {
    console.log("app message " + message);
})

run(({topic, partition, message}) => {
    socketClient.emit('message', message.value.toString());
    return message.value.toString;
}).catch(e => {
    console.error(`Kafka Consummer Exception`, e);
});
const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const { run } = require('../kafka/consumer');
const io = new Server(server);


// io.of('/seol');

// =============
// setTimeout(() => {
//   io.emit('message', 'seolseol')
// }, 5000);

// =============
// const io_client = require('socket.io-client');

// const { makeURLFormat } = require('../common');
// app.get('/start', (req, res) => {
//   const socketClient = io_client(makeURLFormat(process.env.HOST, process.env.PORT));

//   run(({topic, partition, message}) => {
//       socketClient.on('connect', (value) => {
//           console.log('connection server');
//       });

//       socketClient.emit('message', message.value.toString());
//       return message.value.toString;
//   }).catch(e => {
//       console.error(`Kafka Consummer Exception`, e);
//   });
// });

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/index.html');
});

io.on('connection', (socket) => {
  console.log('a user connected');
  console.log('--Info------------------');
  console.log(`WebSocket id : ${socket.id}`)
  console.log('[ room list ]');
  console.log(socket.rooms);

  socket.on('message', (message) => {
    socket.broadcast.emit('message', message);
  });

  socket.on('disconnect', () => {
    console.log('disconnect');
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});
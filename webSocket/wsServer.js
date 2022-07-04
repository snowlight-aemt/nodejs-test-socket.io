const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


const nsp1 = io.of('/nsp1');

nsp1.on('connect', async (socket) => {
    console.log('nsp1 connect : ' + socket.id);
    console.log(`count ${nsp1.sockets.size}`);
    
    // console.dir(await nsp1.allSockets());
    // console.dir(await nsp1.fetchSockets());

    socket.emit('message', 'nsp1 messages');

    socket.on('message', (message) => {
      console.log('receive message fro nsp1');
      socket.broadcast.emit('message', 'all nsp1 message ' + message);
    })

    socket.on('disconnect', () => {
      console.log('disconnection : ' + socket.id);
    })
});


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
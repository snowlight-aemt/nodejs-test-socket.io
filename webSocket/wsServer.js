const express = require('express');
const app = express();

const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);


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
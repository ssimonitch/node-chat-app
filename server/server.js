require('./config/config');

const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const publicPath = path.join(__dirname, '../public');

// create websocket server
const io = socketIO(server);

// server static file
app.use(express.static(publicPath));

io.on('connection', (socket) => {
  console.log('New user connected');

  socket.emit('newMessage', {
    from: 'temmie@example.com',
    text: 'Hoi I\'m Temmie',
    createdAt: 999
  });

  socket.on('createMessage', (newMessage) => {
    console.log(`createdMessage ${JSON.stringify(newMessage, null, 2)}`);
  });

  socket.on('disconnect', () => {
    console.log('Client disconnected');
  });
});

server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

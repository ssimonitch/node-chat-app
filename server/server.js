// add list of currently active chatrooms

require('./config/config');

const http = require('http');
const path = require('path');
const express = require('express');
const socketIO = require('socket.io');

const { Users } = require('./utils/users');
const { Rooms } = require('./utils/rooms');
const { isRealString } = require('./utils/validation');
const { generateMessage, generateLocationMessage } = require('./utils/message');

const app = express();
const port = process.env.PORT;
const server = http.createServer(app);
const publicPath = path.join(__dirname, '../public');

// INIT SERVER AND USER ARRAY
const io = socketIO(server);
let users = new Users();
let rooms = new Rooms();

// SERVE STATIC PAGE AT PATH
app.use(express.static(publicPath));

// SOCKETS
io.on('connection', (socket) => {

  // emit list of current rooms
  socket.emit('updateRoomList', rooms.rooms);

  // on user join
  socket.on('join', (params, callback) => {

    // check for correct input
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required.');
    }

    // check for existing usernames
    if (users.getUserList(params.room).includes(params.name)) {
      return callback('A user with that name is already active.');
    }

    // add room to rooms list if doesn't exist
    if (!rooms.getRoomList().includes(params.room)) {
      rooms.addRoom(params.room);
    }

    // add user to room list
    rooms.addUserToRoomList(params.room, params.name);

    // add user to channel
    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id, params.name, params.room);

    // send updated user list to room
    io.to(params.room).emit('updateUserList', users.getUserList(params.room));

    // send new user a message & all users a message
    socket.emit('newMessage',  generateMessage('Admin', 'Welcome to the chat app'));
    socket.broadcast.to(params.room).emit('newMessage', generateMessage('Admin', `${params.name} has joined`));

    callback();
  });

  // on user creates message
  socket.on('createMessage', (message, callback) => {

    // check for valid user and message
    let user = users.getUser(socket.id);
    if (user && isRealString(message.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, message.text));
    }

    callback();
  });

  // on user send location
  socket.on('createLocationMessage', coords => {

    // check for valid user
    let user = users.getUser(socket.id);
    if (user) {
      io.to(user.room).emit('newLocationMessage', generateLocationMessage(user.name, coords.latitude, coords.longitude));
    }
  });

  // on user disconnect
  socket.on('disconnect', () => {

    let user = users.getUser(socket.id);

    if (user) {
      // remove user from room list
      rooms.removeUserFromRoomList(user.room, user.name);

      // check for valid user, update user list and notify room
      users.removeUser(socket.id);

      io.to(user.room).emit('updateUserList', users.getUserList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin', `${user.name} has left the room`));
    } else {
      return;
    }
  });
});

// server port
server.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

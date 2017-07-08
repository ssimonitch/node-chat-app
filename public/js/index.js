const socket = io();

socket.on('connect', function () {
  console.log('Connected to sever');

  socket.emit('createMessage', {
    from: 'Bob',
    text: 'Hey its bob.'
  });
});

socket.on('disconnect', function () {
  console.log('Disconnected from server');
});

socket.on('newMessage', function (message) {
  console.log('New message', message);
});

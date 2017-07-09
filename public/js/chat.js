var socket = io();

// enable autoscroll
function scrollToBottom () {
  // Selectors
  var messages = $('#messages');
  var newMessage = messages.children('li:last-child');

  // Heights
  var clientHeight = messages.prop('clientHeight');
  var scrollTop = messages.prop('scrollTop');
  var scrollHeight = messages.prop('scrollHeight');
  var newMessageHeight = newMessage.innerHeight();
  var lastMessageHeight = newMessage.prev().innerHeight();

  if (clientHeight + scrollTop + newMessageHeight + lastMessageHeight >= scrollHeight) {
    messages.scrollTop(scrollHeight);
  }
}

// on user connect
socket.on('connect', function() {

  // grab params entered to login window from search
  var params = $.deparam(window.location.search);

  // make room case sensitive
  if (params.room.toLowerCase() != params.room) {
    params.room.toLowerCase();
    window.location.search = window.location.search.toLowerCase();
  }

  // send user params to server
  socket.emit('join', params, function (err) {
    if (err) {
      window.location.href = '/';
      alert(err);
    } else {
      console.log('No error');
    }
  });
});

// on upadted user list
socket.on('updateUserList', function(users) {
  // render list of active users
  let ol = $('<ol></ol>');

  users.forEach(function(user) {
    ol.append($('<li></li>').text(user));
  });

  $('#users').html(ol);
});

// on new message
socket.on('newMessage', function(message) {
  // format message and append to bottom of screen
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    text: message.text,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});

// on new location message
socket.on('newLocationMessage', function(message) {
  // formate message and append to bottom of screen
  var formattedTime = moment(message.createdAt).format('h:mm a');
  var template = $('#location-message-template').html();
  var html = Mustache.render(template, {
    from: message.from,
    url: message.url,
    createdAt: formattedTime
  });

  $('#messages').append(html);
  scrollToBottom();
});

// on user disconnect
socket.on('disconnect', function() {
  console.log('Disconnected from server');
});

// EVENT HANDLERS

// chat message submit handler
$('#message-form').on('submit', function(e) {
  e.preventDefault();

  var messageTextBox = $('[name=message]');

  // emit message to server
  socket.emit('createMessage', {
    text: messageTextBox.val()
  }, function() {
    messageTextBox.val('');
  });
});

// location message click handler
var locationButton = $('#send-location');
locationButton.on('click', function() {

  // check for geolocation support
  if (!navigator.geolocation) {
    return alert('Geolocation not supported by your browser.');
  }

  // disable button while fetching
  locationButton.attr('disabled', 'disabled').text('Sending location');

  // retrieve position and send to server
  navigator.geolocation.getCurrentPosition(function (position) {
    // success case
    locationButton.removeAttr('disabled').text('Send location');

    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    // fail case
    locationButton.removeAttr('disabled').text('Send location');
    alert('Unable to fetch location');
  });
});

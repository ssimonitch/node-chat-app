var socket = io();

// on index page connect
socket.on('connect', function() {

  // on updated rooms list
  socket.on('updateRoomList', function(rooms) {

    let select = $('#room');

    // disable select if no rooms avail
    if (rooms.length === 0) {
      select.attr('disabled', true);
      select.append($('<option>No active rooms</option>'));
    }

    // render select options for all active rooms
    rooms.forEach(function(room) {
      select.append($('<option></option>').text(room.name + ' (users: ' + room.population + ')').attr('value', room.name));
    });
  });
});

// EVENT HANDLERS

// select room event handler
$('select').on('change', function(e) {
  var roomName = e.target.value;
  $('[name=room]').val(roomName);
});

// create new room event handler
$('#new-room-button').on('click', function() {

  // promt user for new room name
  var roomName = prompt('Please enter a room name');

  // break out if cancel prompt
  if (roomName === null) {
    return;
  }

  // check if room exists
  var existingRooms = $('option').map(function() {
    return this.value;
  }).toArray();

  if (existingRooms.includes(roomName)) {
    return alert('That room already exists!');
  }

  // disable existing input, enable hidden input and submit form
  $('select').removeAttr('name');
  $('#new-room-input').attr('name', 'room').val(roomName);
  $('#join-chat-form').submit();
});

const moment = require('moment');

class Rooms {
  constructor() {
    this.rooms = [];
  }

  addRoom(name) {
    const room = {
      name,
      users: [],
      population: 0,
      createdAt: moment().valueOf()
    };

    this.rooms.push(room);
    return room;
  }

  removeRoom(name) {
    const room = this.getRoom(name);
    if (room) {
      this.rooms = this.rooms.filter(room => {
        return room.name !== name;
      });
    }
    return room;
  }

  getRoom(name) {
    const room = this.rooms.filter(room => {
      return room.name === name;
    });
    return room[0];
  }

  getRoomList() {
    const rooms = this.rooms;

    const roomNamesArray = rooms.map(room => {
      return room.name;
    });

    return roomNamesArray;
  }

  addUserToRoomList(roomName, userName) {
    const room = this.getRoom(roomName);

    if (room) {
      room.population++;
      room.users.push(userName);
    }

    return room;
  }

  removeUserFromRoomList(roomName, userName) {
    const room = this.getRoom(roomName);

    if (room) {
      room.population--;
      room.users = room.users.filter(user => {
        return user !== userName;
      });
    }

    return room;
  }
}

module.exports = { Rooms };

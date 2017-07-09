const expect = require('expect');

const { Rooms } = require('./rooms');

describe('Rooms', () => {

  let rooms;

  beforeEach(() => {
    rooms = new Rooms();

    rooms.rooms = [{
      name: 'Test Room 1',
      users: ['Mike', 'John', 'Bob'],
      population: 3,
      createdAt: 149654
    }, {
      name: 'Test Room 2',
      users: ['Jane', 'Nancy'],
      population: 2,
      createdAt: 8468432
    }];
  });

  it('should add a new room', () => {
    let name = 'Test Room 3';
    rooms.addRoom(name);
    expect(rooms.rooms[2].name).toEqual(name);
    expect(rooms.rooms[2].population).toBe(0);
    expect(rooms.rooms[2].createdAt).toBeA('number');
  });

  it('should remove a room', () => {
    const room = rooms.removeRoom('Test Room 1');
    expect(room.name).toBe('Test Room 1');
    expect(rooms.rooms.length).toBe(1);
  });

  it('should not remove a room', () => {
    const room = rooms.removeRoom('Test Room 4');
    expect(room).toNotExist();
    expect(rooms.rooms.length).toBe(2);
  });

  it('should find room', () => {
    const room = rooms.getRoom('Test Room 1');
    expect(room.users.length).toBe(3);
  });

  it('should not find room', () => {
    const room = rooms.getRoom('Test Room 4');
    expect(room).toNotExist();
  });

  it('should return all room names', () => {
    const roomsList = rooms.getRoomList();
    expect(roomsList).toEqual(['Test Room 1', 'Test Room 2']);
  });

  it('should add user to a room', () => {
    const newUser = 'Gary';
    const room = 'Test Room 1';
    rooms.addUserToRoomList(room, newUser);
    expect(rooms.rooms[0].population).toEqual(4);
    expect(rooms.rooms[0].users).toInclude(newUser);
  });

  it('should not add user to a room', () => {
    const newUser = 'Gary';
    const room = 'Test Room 5';
    rooms.addUserToRoomList(room, newUser);
    expect(rooms.rooms.length).toBe(2);
  });


  it('should remove user from room', () => {
    const user = 'John';
    const room = 'Test Room 1';
    rooms.removeUserFromRoomList(room, user);
    expect(rooms.rooms[0].population).toEqual(2);
    expect(rooms.rooms[0].users).toNotInclude(user);
  });
});

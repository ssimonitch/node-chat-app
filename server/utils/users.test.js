const expect = require('expect');

const { Users } = require('./users');

describe('Users', () => {

  let users;

  beforeEach(() => {
    users = new Users();

    users.users = [{
      id: '1',
      name: 'Mike',
      room: 'Node Course'
    }, {
      id: '2',
      name: 'Jen',
      room: 'React Course'
    }, {
      id: '3',
      name: 'Julie',
      room: 'Node Course'
    }];
  });

  it('should add new user', () => {
    let users = new Users();
    let user = {
      id: '123',
      name: 'Bob',
      room: 'Bobs \'r us'
    };

    users.addUser(user.id, user.name, user.room);
    expect(users.users).toEqual([user]);
  });

  it('should remove a user', () => {
    const user = users.removeUser('1');
    expect(user.id).toBe('1');
    expect(users.users.length).toBe(2);
  });

  it('should not remove a user', () => {
    const user = users.removeUser('4');
    expect(user).toNotExist();
    expect(users.users.length).toBe(3);
  });

  it('should find user', () => {
    const user = users.getUser('1');
    expect(user.id).toBe('1');
  });

  it('should not find user', () => {
    const user = users.getUser('4');
    expect(user).toNotExist();
  });

  it('should return names for room Node Course', () => {
    const userList = users.getUserList('Node Course');
    expect(userList).toEqual(['Mike', 'Julie']);
  });

  it('should return names for room React Course', () => {
    const userList = users.getUserList('React Course');
    expect(userList).toEqual(['Jen']);
  });
});

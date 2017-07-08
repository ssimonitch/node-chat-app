const expect = require('expect');

const { generateMessage, generateLocationMessage } = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    const from = 'admin';
    const text = 'test text';
    const message = generateMessage(from, text);
    
    expect(message).toInclude({from, text});
    expect(message.createdAt).toBeA('number');
  });
});

describe('generateLocationMessage', () => {
  it('should generate correct location object', () => {
    const from = 'admin';
    const lat = 34.047387;
    const long = -118.4688661;
    const url = 'https://www.google.com/maps?q=34.047387,-118.4688661';
    const message = generateLocationMessage(from, lat, long);

    expect(message).toInclude({from, url});
    expect(message.createdAt).toBeA('number');
  });
});

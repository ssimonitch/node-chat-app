const expect = require('expect');

const { isRealString } = require('./validation');

describe('isRealString', () => {
  it('should reject non-string values', () => {
    const str = 123;
    const result = isRealString(str);

    expect(result).toBe(false);
  });

  it('should reject string with only spaces', () => {
    const str = ' ';
    const result = isRealString(str);

    expect(result).toBe(false);
  });

  it('should allow string with non-space characters', () => {
    const str = '  this is a test   ';
    const result = isRealString(str);

    expect(result).toBe(true);
  });
});

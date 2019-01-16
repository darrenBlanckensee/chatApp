const expect = require('expect');

var {generateMessage} = require('./message');

describe('generateMessage', () => {
  it('should generate correct message object', () => {
    checkFrom = 'Darren';
    checkText = 'Hey!';
    testMessage = generateMessage(checkFrom,checkText);
    expect(testMessage.from).toEqual(checkFrom);
    expect(testMessage.text).toEqual(checkText);
  });
});

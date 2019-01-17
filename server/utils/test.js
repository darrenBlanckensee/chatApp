const {Users} = require('./users');


var testArrayofUsers = new Users();

var resultingArray = testArrayofUsers.addUser(1,'darren','producers');

resultingArray = testArrayofUsers.addUser(2,'pierre','producers');

resultingArray = testArrayofUsers.addUser(3,'uyanda','not producers');

console.log(testArrayofUsers.getAllUsers());


console.log(testArrayofUsers.removeUser(2));

console.log('\n \n');

console.log(testArrayofUsers.getAllUsers());

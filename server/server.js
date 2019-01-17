const path = require('path');
const http = require('http');
const express = require('express');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');
const {Users} = require('./utils/users');

const {generateMessage,generateLocationMessage} = require('./utils/message');
const {isRealString} = require('./utils/validation');
var app = express();
var server = http.createServer(app);
var io = socketIO(server);
var users = new Users();


publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New User Connected');

  // socket.emit('newMessage',{
  //   from: '0824647324',
  //   text: 'hey whats up.',
  //   createdAt: 123
  // });


  socket.on('join', (params, callback) => {
    if (!isRealString(params.name) || !isRealString(params.room)) {
      return callback('Name and room name are required');
    }

    socket.join(params.room);
    users.removeUser(socket.id);
    users.addUser(socket.id,params.name,params.room);

    io.to(params.room).emit('updateUserList',users.getUsersList(params.room));


    socket.broadcast.to(params.room).emit('newMessage',generateMessage('Admin',`${params.name} has Joined.`));

    socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat!'));


    callback();

  });




  socket.on('createMessage', (newMessage, callback) => {
    var user = users.getUser(socket.id)[0];

    if (user && isRealString(newMessage.text)) {
      io.to(user.room).emit('newMessage', generateMessage(user.name, newMessage.text));
    }

    callback();

  });

  socket.on('createLocationMessage', (coords) => {

    var user = users.getUser(socket.id)[0];

    if (user) {
      io.to(user.room).emit('newLocationMessage',generateLocationMessage(user.name,coords.latitude,coords.longitude));
    }



    //io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });



  socket.on('disconnect', () => {

    console.log('before disconnect:', users.getAllUsers());
    console.log('User was disconnected with socket id:',socket.id);
    var user = users.removeUser(socket.id)[0];
    console.log('before disconnect:', users.getAllUsers());
    console.log(user.room,': ',user.name);
    if (user) {

      io.to(user.room).emit('updateUserList',users.getUsersList(user.room));
      io.to(user.room).emit('newMessage', generateMessage('Admin',`${user.name} has left.`));
    }
  })

//https://www.google.com/maps/@-26.1602003,28.075674199999998

});

//
// app.get('/', (req, res) => {
//   res.render(publicPath);
// });


server.listen(port);

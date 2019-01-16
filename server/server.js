const path = require('path');
const http = require('http');
const express = require('express');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');

const {generateMessage,generateLocationMessage} = require('./utils/message');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New User Connected');

  // socket.emit('newMessage',{
  //   from: '0824647324',
  //   text: 'hey whats up.',
  //   createdAt: 123
  // });

  socket.broadcast.emit('newMessage',generateMessage('Admin','New User Joined'));

  socket.emit('newMessage', generateMessage('Admin', 'Welcome to the Chat!'));

  socket.on('createMessage', (newMessage, callback) => {
    console.log('create Message: ',newMessage);
    io.emit('newMessage', generateMessage(newMessage.from, newMessage.text));
    callback();

  });

  socket.on('createLocationMessage', (coords) => {
    io.emit('newLocationMessage',generateLocationMessage('Admin',coords.latitude,coords.longitude));
  });

  // socket.on('disconnect', () => {
  //   console.log('User was disconnected');
  // })

//https://www.google.com/maps/@-26.1602003,28.075674199999998

});

//
// app.get('/', (req, res) => {
//   res.render(publicPath);
// });


server.listen(port);

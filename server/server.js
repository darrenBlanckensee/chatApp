const path = require('path');
const http = require('http');
const express = require('express');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');

const {generateMessage} = require('./utils/message');

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
    callback('Data was recieved');
    // socket.broadcast.emit('newMessage', {
    //   from: newMessage.from,
    //   text: newMessage.text,
    //   createdAt: new Date().getTime()
    // });
  });

  // socket.on('disconnect', () => {
  //   console.log('User was disconnected');
  // })
});

//
// app.get('/', (req, res) => {
//   res.render(publicPath);
// });


server.listen(port);

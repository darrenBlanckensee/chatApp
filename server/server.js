const path = require('path');
const http = require('http');
const express = require('express');
const port = process.env.PORT || 3000;
const socketIO = require('socket.io');

var app = express();
var server = http.createServer(app);
var io = socketIO(server);


publicPath = path.join(__dirname, '../public');

app.use(express.static(publicPath));

io.on('connection',(socket) => {
  console.log('New User Connected');

  socket.on('disconnect', () => {
    console.log('User was disconnected');
  })
});

//
// app.get('/', (req, res) => {
//   res.render(publicPath);
// });


server.listen(port);

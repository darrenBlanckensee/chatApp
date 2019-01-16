  var socket = io();
  socket.on('connect',function() {
    console.log('Connected to Server');

    // socket.emit('createMessage',{
    //   to: 'Group1',
    //   text: 'hey hey'
    // });

  });

  socket.on('newUserJoined', function(user) {
    console.log(`${user.name} joined.`);
  });


  socket.on('newMessage', function(message) {
    console.log('new message: ',message);
  })

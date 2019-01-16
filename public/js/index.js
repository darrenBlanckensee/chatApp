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
    var li = jQuery('<li></li>');
    li.text(`${message.from}: ${message.text}`);
    jQuery('#messages').append(li);
  });

  socket.emit('createMessage', {
    from: 'Frank',
    text: 'Hi'
  }, function(callbackResponse) {
    console.log(callbackResponse);
  });

  jQuery('#message-form').on('submit',function(e) {
    e.preventDefault();
    socket.emit('createMessage',{
      from: 'User',
      text: jQuery('[name=message]').val()
    }, function() {

    });
  })

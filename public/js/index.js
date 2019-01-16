  var socket = io();

  function scrollToBottom() {
    var messages = jQuery('#messages');
    var newMessage = messages.children('li:last-child');

    var clientHeight = messages.prop('clientHeight');
    var scrollTop = messages.prop('scrollTop');
    var scrollHeight = messages.prop('scrollHeight');
    var newMessageHeight = newMessage.innerHeight();
    var lastMessageHeight = newMessage.prev().innerHeight();

    if ( clientHeight + scrollTop + newMessageHeight + lastMessageHeight>= scrollHeight) {
      messages.scrollTop(scrollHeight);
    }

  }


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

    var template = jQuery('#message-template').html();
    var html = Mustache.render(template, {
      text: message.text,
      from: message.from,
      createdAt: new Date().getTime()
    });
    jQuery('#messages').append(html);
    scrollToBottom();

    // console.log('new message: ',message);
    // var li = jQuery('<li></li>');
    // li.text(`${message.from}: ${message.text}`);
    // jQuery('#messages').append(li);


  });

    socket.on('newLocationMessage', function(message) {

      var template = jQuery('#location-message-template').html();
      var html = Mustache.render(template, {
        from: message.from,
        url: message.url,
        createdAt: new Date().getTime()
      });
      jQuery('#messages').append(html);
      scrollToBottom();
      //
      // var li = jQuery('<li></li>');
      // var a = jQuery('<a target="_blank">My current location</a>');
      // li.text(`${message.from}: `);
      // a.attr('href',message.url);
      //
      // li.append(a);
      // jQuery('#messages').append(li);
    })

    var messageTextbox = jQuery('[name=message]');

  jQuery('#message-form').on('submit',function(e) {
    e.preventDefault();
    socket.emit('createMessage',{
      from: 'User',
      text: messageTextbox.val()
    }, function() {
      messageTextbox.val('');
    });
  })


var locationButton = jQuery('#send-location');

locationButton.on('click', function() {
  if (!navigator.geolocation){
    return alert('Geolocation not supported by your browser');
  }

  locationButton.attr('disabled','disabled').text('Sending Location...');

  navigator.geolocation.getCurrentPosition(function(position) {
    locationButton.removeAttr('disabled').text('Send Location');
    socket.emit('createLocationMessage', {
      latitude: position.coords.latitude,
      longitude: position.coords.longitude
    });
  }, function() {
    locationButton.removeAttr('disabled').text('Send Location');
    alert('Unable to fetch location');

  });
});

const http = require('http');
const server = http.createServer();
const io = require('socket.io')(server);
const cors = require('cors')



io.on('connection', socket => {
  console.log('A user connected');
  socket.emit('connection-success', {id: socket.id, status: 'connected'});


  socket.on('video-offer', ({ sdp, reciever, sender }) => {
    // console.log('reciever', reciever)
    // console.log(sender)
    // const targetUser = io.sockets.sockets.get(reciever);
    // if(targetUser) {
    //   targetUser.emit('video-offer', {sdp, reciever, sender});
    // }
    socket.broadcast.emit('video-offer', {sdp, reciever, sender})
      // console.log('targetUser', targetUser)
  })

  


  socket.on('video-answer', ({ sdp, answering, status, reciever }) => {
    // console.log('answering', answering)
    socket.broadcast.emit('video-answer', { sdp, answering, status });
    // const targetUser = io.sockets.sockets.get(answering.id);
    // if(targetUser) {
    //   targetUser.emit('video-answer', { sdp, answering, status });
    // }
  })




  socket.on('new-ice-candidate', data => {
    
    socket.broadcast.emit('new-ice-candidate', data);
  })





  socket.on('disconnect', () => {
    console.log('A user disconnected');
  });
});



server.listen(3000, () => {
  console.log('Server listening on port 3000');
});

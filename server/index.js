const http = require('http');
const express = require('express');
const socketio = require('socket.io');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom, getHostName, logUsers } = require('./users');

const router = require('./router');
const { usersRouter } = require('./users');

const app = express();
const server = http.createServer(app);
const io = socketio(server, { origins: '*:*'});

app.use(cors());
app.use(router);
app.use('/users', usersRouter);

io.on('connection', (socket)=> {

    socket.on('join', ({ name, room, host }, callback) => {
      const { error, user } = addUser({ id: socket.id, name, room, host});
  
      if (error) return callback(error); 
      
      // goes to Host
      socket.emit('message', { user: 'admin', text: `${user.name} has joined!` });
      
      // goes to Listeners
      socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });
  
      socket.join(user.room);
  
      io.to(user.room).emit('roomData', { 
        room: user.room, 
        hostName: getHostName(user.room), 
        users: getUsersInRoom(user.room),
      });
  
      if (callback) callback();
    });
  
    socket.on('sendMessage', (message, callback) => {
      const user = getUser(socket.id);
      io.to(user.room).emit('message', { user: user.name, text: message });
  
      callback();
    });
  
    socket.on('sendSongData', (data, callback) => {
      const user = getUser(socket.id);
      // io.to(user.room).emit('message', { user: 'admin', text: `${user.name} ${data.is_playing ? 'resumed playing' : 'has paused'} ${data.item.name}.` });
      io.to(user.room).emit('data', data);
  
      callback();
    });
  
    socket.on('disconnect', () => {

      const user = removeUser(socket.id);

      // logUsers();

      // if (user.host) {
      //   io.of('/').in(user.room).clients((error, socketIds) => {
      //     if (error) throw error;
        
      //     socketIds.forEach(socketId => {
      //       io.sockets.sockets[socketId].leave(user.room);
      //       removeUser(socketId);
      //     });
      //   });
      // }

      // logUsers();
  
      if (user) {
        io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
        io.to(user.room).emit('roomData', { 
          room: user.room, 
          hostName: getHostName(user.room), 
          users: getUsersInRoom(user.room), 
        });
      }
    });
  })

server.listen(process.env.PORT || 5000, () => console.log(`Server has started on port 5000.`));
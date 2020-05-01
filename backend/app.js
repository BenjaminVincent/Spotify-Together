const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('morgan');
const cors = require('cors');

const { addUser, removeUser, getUser, getUsersInRoom } = require('./users');

const indexRouter = require('./routes/index');
const usersRouter = require('./routes/users');
const testAPIRouter = require("./routes/testAPI");


const app = express();
const server = require('http').Server(app);
const io = require('socket.io')(server);

// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(cors());
app.use(logger('dev'));
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/users', usersRouter);
app.use('/testAPI', testAPIRouter);

// catch 404 and forward to error handler
app.use(function(req, res, next) {
  next(createError(404));
});


// Socket IO setup (All socket management is made in this function)
io.on('connection', (socket)=> {
  socket.on('join', ({ name, room }, callback) => {
    const { error, user } = addUser({ id: socket.id, name, room});

    if (error) return callback(error); 

    socket.emit('message', { user: 'admin', text: `${user.name} has joined!` });
    socket.broadcast.to(user.room).emit('message', { user: 'admin', text: `${user.name} has joined!` });

    socket.join(user.room);

    io.to(user.room).emit('roomData', { room: user.room, users: getUsersInRoom(user.room) });

    if (callback) callback();
  });

  socket.on('sendMessage', (message, callback) => {
    const user = getUser(socket.id);
    console.log('user', user);
    io.to(user.room).emit('message', { user: user.name, text: message });
    io.to(user.room).emit('roomData', { room: user.room, text: message });

    callback();
  });

  socket.on('disconnect', () => {
    console.log('a user has left');
    const user = removeUser(socket.id);

    if (user) {
      io.to(user.room).emit('message', { user: 'admin', text: `${user.name} has left.` })
    }
  });
});

server.listen(8081, () => {
  console.log('server listening on port: 8081');
});

// error handler
app.use(function(err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;

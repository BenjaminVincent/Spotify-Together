const express = require("express");
const usersRouter = express.Router();

usersRouter.get('/', function(req, res, next) {
  res.send(users);
});

const users = [];

const addUser = ({ id, name, room, host }) => {
  name = name.trim();
  room = room.trim();

  const existingUser = users.find((user) => user.room === room && user.name.toLowerCase() === name.toLowerCase());
  const maxNameLength = 20;

  if (!name || !room) return { error: 'Username and room are required.' };
  if (existingUser) return { error: 'Username is taken.' };
  if (name.length > maxNameLength) return { error: 'Username is too long' };

  const user = { id, name, room, host };

  users.push(user);

  return { user };
}

const removeUser = (id) => {
  const index = users.findIndex((user) => user.id === id);

  if (index !== -1) return users.splice(index, 1)[0];
}

const getUser = (id) => users.find((user) => user.id === id);

const getUsersInRoom = (room) => users.filter((user) => user.room === room);

const getHostName = (room) => {
  if (getUsersInRoom(room).filter((user) => user.host).length === 0) {
    return;
  } else {
    return getUsersInRoom(room).filter((user) => user.host)[0].name;
  }
}

const getHostID = (room) => {
  if (getUsersInRoom(room).filter((user) => user.host).length === 0) {
    return;
  } else {
    return getUsersInRoom(room).filter((user) => user.host)[0].id;
  }
}

const getUserID = (name, room) => {
  const user = getUsersInRoom(room).filter((user) => user.name === name);
  if (user.length) return user[0].id;
}

const logUsers = () => console.log('users', users);

module.exports = { 
    addUser, 
    removeUser, 
    getUser, 
    getUsersInRoom,
    getHostName,
    getHostID,
    logUsers,
    getUserID,
    usersRouter,
};
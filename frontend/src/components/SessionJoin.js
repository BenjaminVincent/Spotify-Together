import React, { useState, useEffect } from 'react';
import Player from './Player';
import Chat from './Chat';
import io from 'socket.io-client';
import queryString from 'query-string';

let socket;

const SessionJoin = ({ token }) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  const ENDPOINT = 'localhost:8081';

  useEffect(() => {
      const { name, room } = queryString.parse(window.location.search);

      socket = io(ENDPOINT);
      setName(name);
      setRoom(room);

      socket.emit('join', { name, room }, () => {});

      // on dismount of component
      return () => {
          socket.emit('disconnect');
          socket.off();
      }
  }, [ENDPOINT]);

  return (
    <div>
      <div className='host-session'>
        <div>Host: {name}</div>
        <div>Room: {room}</div>
        <Player token={token}/>              

        {/* <div className='joinOuterContainer'><Chat/></div> */}
      </div>
    </div>
  )
}

export default SessionJoin;



  

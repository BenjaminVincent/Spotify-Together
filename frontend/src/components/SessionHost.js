import React, { useState, useEffect } from 'react';
import PlayerHost from './PlayerHost';
import Chat from './Chat';
import queryString from 'query-string';

const SessionHost = ({ token }) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    setName(name);
    setRoom(room);
  }, []);

  return (
    <div>
      <div className='host-session'>
        <div>Host: {name}</div>
        <div>Room: {room}</div>
        <PlayerHost 
          token={token}
          name={name}
          room={room}
          />              

        {/* <div className='joinOuterContainer'><Chat/></div> */}
      </div>
    </div>
  )
}

export default SessionHost;



  

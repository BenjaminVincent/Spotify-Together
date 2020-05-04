import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateID } from '../helpers/player-helper.js';
import '../styles/Player.css';
import '../styles/App.css';
import '../styles/Host.css';
import Chat from './Chat';
import Player from './Player';



const Host = ({ token }) => {
 
  const [name, setName] = useState('');

  const [created, setCreated] = useState(false);

  const [room, setRoom] = useState(generateID);

  return (
     <div>
      {created ? 
        <div className='host-session'>
          <div>Host: {name}</div>
          <div>Room: {room}</div>
          <Player token={token}/>              

        {/* <div className='joinOuterContainer'><Chat/></div> */}
      </div>
  :
  <div className='joinOuterContainer'>
<div className='heading'>Host session</div><br/>
<div>
    <div>
      <input 
          placeholder='Display Name' 
          className='joinInput' 
          type='text' 
          onChange={(event) => {
            setName(event.target.value);
            }}/></div><br/>
    <div>
    <Link
      to={`/host?name=${name}&room=${room}`}>
      <button 
        className='btn btn--loginApp-link' 
        type='submit' 
        onClick={(event) => {
          name ? setCreated(true) : event.preventDefault();
        }}
      >join</button>
    </Link>
    </div>
</div>
</div>
    }
      
  </div>

  );
}

export default Host;
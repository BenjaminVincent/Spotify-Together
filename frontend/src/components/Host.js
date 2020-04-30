import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Player.css';
import '../styles/App.css';
import Chat from './Chat';
import Player from './Player';


const Host = (props) => {

  const { 
    token, 
    item, 
    is_playing, 
    progress_ms, 
    deviceId, 
    handlePausePlay,
    getCurrentlyPlaying,
    created,
    setCreatedRoom,
    room,
    setHostName,
    name,
  } = props;
 
  const [nameTemp, setNameTemp] = useState('');

  return (
     <div className='joinOuterContainer'>
      {created ? 
        <div>
          <div>Host: {name}</div>
          <div>Room: {room} </div>
          <Player
            item={item}
            is_playing={is_playing}
            position_ms={progress_ms}
            deviceId={deviceId}
          />              
        <button 
          type='button' 
          className='btn btn--pause-play'
          onClick={() => {
            handlePausePlay();
            getCurrentlyPlaying(token);
          }}
        >
          {is_playing ? 'Pause' : 'Play'}
        </button>
        <div><Chat/></div>
      </div>
  :
  <div>
<div className='heading'>Host session</div><br/>
<div>
    <div>
      <input 
          placeholder='Display Name' 
          className='joinInput' 
          type='text' 
          onChange={(event) => {
            setNameTemp(event.target.value);
            }}/></div><br/>
    <div>
    <Link
      to={`/host?name=${nameTemp}&room=${room}`}>
      <button 
        className='btn btn--loginApp-link' 
        type='submit' 
        onClick={(event) => {
          setHostName(nameTemp);
          nameTemp ? setCreatedRoom() : event.preventDefault();
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
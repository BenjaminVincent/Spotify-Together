import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { authEndpoint, clientId, redirectUri, scopes } from "../helpers/authConfig";
import "../styles/Player.css";
import '../styles/App.css';
import Player from './Player';


// This component must contain the Player


const Host = (props) => {

  const { 
    token, 
    item, 
    is_playing, 
    progress_ms, 
    deviceId, 
    handlePausePlay,
    getCurrentlyPlaying,
  } = props;

  const generateID = () => {
    return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
    
  }

  const [name, setName] = useState('');
  const [roomID, setRoomID] = useState(generateID);
  const [create, setCreate] = useState();



  return (
     <div className="joinOuterContainer">
       {console.log("is_playing:", is_playing)}
      {create ? 
        <div>
          <div>Host: {name}</div>
          <div>Room: {roomID} </div>
          <Player

            item={item}
            is_playing={is_playing}
            position_ms={progress_ms}
            deviceId={deviceId}
          />              
        <button 
          type="button" 
          className="btn btn--pause-play"
          onClick={() => {
            handlePausePlay();
            getCurrentlyPlaying(token);
          }}
        >
          {is_playing ? "Pause" : "Play"}
        </button>
      </div>
  :
  <div>
<div className="heading">Host session</div><br/>
<div>
    <div>
      <input 
          placeholder="Display Name" 
          className="joinInput" 
          type="text" 
          onChange={(event) => {
            setName(event.target.value);
            }}/></div><br/>
    <div>
    <Link onClick={() => {
      setCreate(true);
      }} to={`/host?name=${name}&roomID=${roomID}`}>
      <button 
        className="btn btn--loginApp-link" 
        type="submit" 
        onClick={(event) => name ? null : event.preventDefault()}
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


      
/* <div className="heading">Host session</div><br/>
<div>
    <div><input 
          placeholder="Display Name" 
          className="joinInput" 
          type="text" 
          onChange={(event) => {
            setName(event.target.value)
            setRoomID(randomToken())
            }}/></div><br/>
    <div>
    <a
      onClick={(event) => !name ? event.preventDefault() : null} 
      href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
      "%20"
      )}&response_type=token&show_dialog=true`}>
                  <button className="btn bton--loginApp-link" type="submit">join</button>
    </a>
    </div>
</div> */


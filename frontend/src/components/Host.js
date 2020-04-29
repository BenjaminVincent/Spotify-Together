import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import queryString from 'query-string';
import { authEndpoint, clientId, redirectUri, scopes } from "../helpers/authConfig";
import "../styles/Player.css";
import '../styles/App.css';
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
    roomID,
  } = props;
 
  const [name, setName] = useState('');

  // const [roomID, setRoomID] = useState(generateID);

  useEffect(() => {
    const { name } = queryString.parse(window.location.search);
    setName(name);
  }, [window.location.search]);


  console.log("create", created);
  return (
     <div className="joinOuterContainer">
       {console.log("is_playing:", is_playing)}
      {created ? 
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
            console.log('clicked');
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
    <Link
      to={`/host?name=${name}&roomID=${roomID}`}>
      <button 
        className="btn btn--loginApp-link" 
        type="submit" 
        onClick={(event) => name ? setCreatedRoom() : event.preventDefault()}
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


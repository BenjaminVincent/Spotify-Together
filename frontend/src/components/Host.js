import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authEndpoint, clientId, redirectUri, scopes } from "../helpers/authConfig";
import "../styles/Player.css";
import Player from './Player';


// This component must contain the Player


const Host = (props) => {
  console.log('host props:', props);

  const { token, item, is_playing, position_ms, deviceId } = props;
  const [name, setName] = useState('');
  const [roomID, setRoomID] = useState('');
  const [create, setCreate] = useState(false);

  function randomToken() {
    return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
  }

  return (
     <div className="joinOuterContainer">
      {token && create === true ? 
        <div>
          Name: {name}
          <Player
            roomID={roomID}
            item={item ? item : ""}
            is_playing={is_playing}
            // position_ms={progress_ms}
            deviceId={deviceId}
          />              
        <button type="button" className="btn btn--pause-play"
          is_playing={is_playing}
          // onClick={handlePausePlay}
        >
          {is_playing ? "Pause" : "Play"}
        </button>
</div>
  :
  <div>
<div className="heading">Host session</div><br/>
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
    <Link onClick={(event) => !name ? event.preventDefault() : null} to={`/host?name=${name}&room=${roomID}`}>
      <button className="btn bton--loginApp-link" type="submit" onClick={() => setCreate(true)}>join</button>
      </Link>
    </div>
</div>
</div>
    }
      
  </div>

  );
}

export default Host;


/*
token && name ?
  load the Player and Chat
  :
  load the host session
*/



      
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


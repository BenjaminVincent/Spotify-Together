import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { authEndpoint, clientId, redirectUri, scopes } from "../helpers/authConfig";
import "../styles/Player.css";


const Host = (props) => {
  const [name, setName] = useState('');
  const [roomID, setRoomID] = useState('');

  function randomToken() {
    return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
  }

  return (
     <div className="joinOuterContainer">
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
          <a
            onClick={(event) => !name ? event.preventDefault() : null} 
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
            )}&response_type=token&show_dialog=true`}>
                        <button className="btn bton--loginApp-link" type="submit">join</button>
          </a>
          </div>
      </div>
  </div>

  );
}

export default Host;
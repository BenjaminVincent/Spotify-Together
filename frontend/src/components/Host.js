import React, { useState } from 'react';
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
          <div><input placeholder="Display Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)}/></div><br/>
          <div>
          </div>
      </div>
  </div>

  );
}

export default Host;
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/Listener.css';
import Player from './Player';

const Join = ({ token }) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');
    
    const [joined, setJoined] = useState(false);

    return (
        <div>
            {joined ?
          <div className='host-session'>
          <div>Host: {name}</div>
          <div>Room: {room}</div>
          <Player token={token}/>              

        {/* <div className='joinOuterContainer'><Chat/></div> */}
      </div> 
      :
      <div className='joinOuterContainer'>  
        <div className='heading'>Join session</div><br/>
            <div>
            <div><input placeholder='Display Name' className='joinInput' type='text' onChange={(event) => setName(event.target.value)}/></div><br/>
            <div><input placeholder="Room ID" className="joinInput"type="text" onChange={(event) => setRoom(event.target.value)}/></div><br/>
            <div>
                <Link onClick={(event) => (name || room) ? setJoined(true) : event.preventDefault()} to={`/join?name=${name}&room=${room}`}>
                    <button className='btn bton--loginApp-link' type='submit'>join</button>
                </Link>
            </div>
        </div>
      </div>
      }
        </div>

    )
}

export default Join;

{/* <div className='joinOuterContainer'>
<div className='heading'>Join session</div><br/>
    <div>
        <div><input placeholder='Display Name' className='joinInput' type='text' onChange={(event) => setName(event.target.value)}/></div><br/>
        <div><input placeholder="Room ID" className="joinInput"type="text" onChange={(event) => setRoom(event.target.value)}/></div><br/>
        <div>
            <Link onClick={(event) => (!name || !room) ? event.preventDefault() : null} to={`/session?name=${name}&room=${room}`}>
                <button className='btn bton--loginApp-link' type='submit'>join</button>
            </Link>
        </div>
    </div>
</div> */}
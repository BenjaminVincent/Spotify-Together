import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import "../styles/Listener.css";

const Listener = (props) => {
    const [name, setName] = useState('');
    const [room, setRoom] = useState('');

    return (
        <div className="joinOuterContainer">
        <div className="heading">Join a session</div><br/>
            <div>
                <div><input placeholder="Display Name" className="joinInput" type="text" onChange={(event) => setName(event.target.value)}/></div><br/>
                <div><input placeholder="Room ID" className="joinInput"type="text" onChange={(event) => setRoom(event.target.value)}/></div><br/>
                <div>
                    <Link onClick={(event) => (!name || !room) ? event.preventDefault() : null} to={`/chat?name=${name}&room=${room}`}>
                        <button className="btn bton--loginApp-link" type="submit">Sign in</button>
                    </Link>
                </div>
            </div>
        </div>
    )
}

export default Listener;
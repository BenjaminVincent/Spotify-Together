import React from 'react';
import Peer from 'peerjs';


const Listener = (props) => {
    return (
        <div>
            Listener Component <br/>
            <input type="text" placeholder="paste id here" autoFocus="true"></input>
            <br/>
            <button type="button">join</button>
        </div>
    )
}

export default Listener;
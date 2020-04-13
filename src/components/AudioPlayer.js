import React from "react";
import '../styles/AudioPlayer.css'
import * as $ from "jquery";
import Peer from 'peerjs';


const AudioPlayer = (props) => {

    let peer = new Peer('q0fe2aar1fa00000');
    let peer2 = new Peer('ywlkmi6fo8000000');
    peer.on('open', (id) => console.log('My peer ID is: ' + id));


    console.log("peer id:", peer.id);

    let conn = peer.connect('dest-peer-id');

    peer.on('connection', (conn) => console.log("connected!?", conn));
    
    return (
        <div>
            Audio
        </div>
    );
}

export default AudioPlayer;
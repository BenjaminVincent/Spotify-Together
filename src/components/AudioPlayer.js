import React from "react";
import '../styles/AudioPlayer.css'
import * as $ from "jquery";
import Peer from 'peerjs';


const AudioPlayer = (props) => {

    let lastPeerId = null;
    let peer = null;
    let peerId = null;
    let conn = null;

    peer = new Peer(null, {
        debug: 2,
    });

    peer.on('open', (id) => {
        if (peer.id === null) {
            console.log('Received null id from peer open');
            peer.id = lastPeerId;
        } else {
            lastPeerId = peer.id;
        }

        console.log('ID: ' + peer.id);
    });

    peer.on('connection', function (c) {
        // Allow only a single connection
        if (conn) {
            c.on('open', function() {
                c.send("Already connected to another client");
                setTimeout(function() { c.close(); }, 500);
            });
            return;
        }

        conn = c;
        console.log("Connected to: " + conn.peer);
    });

    return (
        <div>
            Audio
        </div>
    );
}

export default AudioPlayer;
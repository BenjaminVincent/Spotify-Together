import React, { useState } from 'react';
import "../styles/Player.css";


const Host = (props) => {

  const [roomID, setRoomID] = useState('');

  function randomToken() {
    return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
  }


  const backgroundStyles = {
    backgroundImage: `url(${
      props.item.album.images[0].url
    })`,
  };
  const progressBarStyles = {
    width: (props.position_ms * 100 / props.item.duration_ms) + '%'
  };
  return (
    <div>
      Room: haha lol xD
    <div className="App">
      <div className="main-wrapper">
        <div className="now-playing__img">
          <img src={props.item.album.images[0].url} alt="not found"/>
        </div>
        <div className="now-playing__side">
          <div className="now-playing__name">{props.item.name ? props.item.name : "Error, nothing is playing"}</div>
          
          <div className="now-playing__artist">
           Artist: {props.item.artists[0].name} <br/>
           Album: {props.item.album.name}
          </div>
          <div className="progress">
            <div className="progress__bar" style={progressBarStyles} />
          </div>
        </div>
        <div className="background" style={backgroundStyles} />{" "}

      </div>
    </div>
    </div>
  );
}

export default Host;


// let isInitiator;

// let room = window.location.hash.substring(1);
// if (!room) {
//   room = window.location.hash = randomToken();
// }
// let socket = io.connect();

// if (room !== "") {
//   console.log('Message from client: Asking to join room ' + room);
//   socket.emit('create or join', room);
// }

// socket.on('created', (room, clientId) => {
//   isInitiator = true;
// });

// socket.on('full', (room) => {
//   console.log('Message from client: Room ' + room + ' is full :^(');
// });

// socket.on('ipaddr', (ipaddr) => {
//   console.log('Message from client: Server IP address is ' + ipaddr);
// });

// socket.on('joined', (room, clientId) => {
//   isInitiator = false;
// });

// socket.on('log', (array) => {
//   console.log.apply(console, array);
// });

// function randomToken() {
//   return Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
// }

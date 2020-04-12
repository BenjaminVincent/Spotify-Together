import React from "react";
import "../styles/Player.css";


const Player = (props) => {
  console.log("Player props:", props);
  const backgroundStyles = {
    backgroundImage:`url(${
      props.item.album.images[0].url
    })`,
  };
  const progressBarStyles = {
    width: (props.position_ms * 100 / props.item.duration_ms) + '%'
  };
  console.log("progressbarStyles:", progressBarStyles);
  return (
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
  );
}

export default Player;


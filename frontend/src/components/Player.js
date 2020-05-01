import React from 'react';
import '../styles/Player.css';
import { getDevices } from '../helpers/player-helper.js';


const Player = ({ token }) => {

  // const backgroundStyles = {
  //   backgroundImage: `url(${props.item.album.images[0].url})`,
  // };
  // const progressBarStyles = {
  //   width: (props.position_ms * 100 / props.item.duration_ms) + '%'
  // };
  getDevices(token);
  return (
    <div>Player</div>
  );
}

export default Player;

/* <button 
type='button' 
className='btn btn--pause-play'
onClick={() => {
  handlePausePlay();
  getCurrentlyPlaying(token);
}}
>
{is_playing ? 'Pause' : 'Play'}
</button> */

/* <div>
<div className='App'>
  <div className='main-wrapper'>
    <div className='now-playing__img'>
      <img src={props.item.album.images[0].url} alt='not found'/>
    </div>
    <div className='now-playing__side'>
      <div className='now-playing__name'>{props.item.name ? props.item.name : 'nothing is playing'}</div>
      
      <div className='now-playing__artist'>
       Artist: {props.item.artists[0].name} <br/>
       Album: {props.item.album.name}
      </div>
      <div className='progress'>
        <div className='progress__bar' style={progressBarStyles} />
      </div>
    </div>
    <div className='background' style={backgroundStyles} />{' '}

  </div>
</div>
</div> */
import React, { useState, useEffect } from 'react';
import '../styles/Player.css';
import { filterDevices } from '../helpers/player-helper.js';


const Player = ({ token }) => {

  const [device, setDevice] = useState('');
  const [playing, setPlaying] = useState('');
  const [i, setI] = useState('');
  const [progress, setProgress] = useState('');

  const getDevices = (token) => {
    fetch('https://api.spotify.com/v1/me/player/devices', {
      method: 'GET', headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(data => {
        const activeDevice = filterDevices(data);
        setDevice(activeDevice[0].id);
      })
      .catch(err => err);
    }

  const getCurrentlyPlaying = (token) => {
    fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      method: 'GET', headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(data => {
        setPlaying(data.is_playing);
        setI(data.item);
        setProgress(data.progress_ms);
        console.log('item', data.item);
      })
      .catch(err => err);
  }


  useEffect(() => {
    getDevices(token);
    getCurrentlyPlaying(token);
  }, [])

  // const backgroundStyles = {
  //   backgroundImage: `url(${item.album.images[0].url})`,
  // };
  // const progressBarStyles = {
  //   width: (progress * 100 / item.duration_ms) + '%'
  // };

  return (
    <div>
{/* <div className='App'>
  <div className='main-wrapper'>
    <div className='now-playing__img'>
      <img src={item.album.images[0].url} alt='not found'/>
    </div>
    <div className='now-playing__side'>
      <div className='now-playing__name'>{item.name ? item.name : 'nothing is playing'}</div>
      
      <div className='now-playing__artist'>
       Artist: {item.artists[0].name} <br/>
       Album: {item.album.name}
      </div>
      <div className='progress'>
        <div className='progress__bar' style={progressBarStyles} />
      </div>
    </div>
    <div className='background' style={backgroundStyles} />{' '}

  </div>
</div> */}
</div>
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


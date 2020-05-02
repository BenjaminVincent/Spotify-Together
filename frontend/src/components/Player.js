import React, { useState, useEffect } from 'react';
import '../styles/Player.css';
import { filterDevices } from '../helpers/player-helper.js';
import * as $ from 'jquery';


const Player = ({ token }) => {

  const [device, setDevice] = useState('');
  const [playing, setPlaying] = useState('');
  const [item, setItem] = useState('');
  const [progress, setProgress] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [image, setImage] = useState('');

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
        setItem(data.item);
        setProgress(data.progress_ms);
        setArtist(data.item.artists[0].name);
        setAlbum(data.item.album.name);
        setImage(data.item.album.images[0].url);
        console.log('progress', data.progress_ms);
        console.log('item', data.item);
      })
      .catch(err => err);
  }

const pauseCurrent = (token) => {
  $.ajax({
    url: `https://api.spotify.com/v1/me/player/pause?device_id=${device}`,
    type: 'PUT',
    beforeSend: xhr => {
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      getCurrentlyPlaying(token);
    },
    success: () => {
      setPlaying(false);
    },
    error: function(error) { 
      console.log("Status: " + error); //alert("Error: " + errorThrown); 
  }
  });
}

const playCurrent = (token) => {
  $.ajax({
    url: `https://api.spotify.com/v1/me/player/play?device_id=${device}`,
    type: 'PUT',
    beforeSend: xhr => {
      xhr.setRequestHeader('Authorization', 'Bearer ' + token);
      getCurrentlyPlaying(token);
    },
    success: () => {
      setPlaying(true);
    }
  });
}

const handlePausePlay = () => {
  console.log('playing', playing);
  playing ? pauseCurrent(token) : playCurrent(token);
}

  useEffect(() => {
    getDevices(token);
    getCurrentlyPlaying(token);
  }, [])

  const backgroundStyles = {
    backgroundImage: `url(${image})`,
  };

  const progressBarStyles = {
    width: (progress * 100 / item.duration_ms) + '%'
  };

  return (
    <div className='App'>
      <div className='main-wrapper'>
        <div className='now-playing__img'>
          <img src={image} alt='not found'/>
        </div>
        <div className='now-playing__side'>
          <div className='now-playing__name'>{item.name}</div>
          <div className='now-playing__artist'>
           Artist: {artist} <br/>
           Album: {album}
          </div>
          <div className='progress'>
            <div className='progress__bar' style={progressBarStyles} />
          </div>
          <div className='background' style={backgroundStyles} />{' '}
        </div>
      </div>
      <button 
        type='button' 
        className='btn btn--pause-play'
        onClick={() => {
          handlePausePlay();
        }}
        >
        {playing ? 'Pause' : 'Play'}
      </button> 
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


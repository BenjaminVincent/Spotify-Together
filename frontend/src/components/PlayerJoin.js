import React, { useState, useEffect } from 'react';
import ProgressBar from './ProgressBar';
import '../styles/Player.css';
import { filterDevices } from '../helpers/player-helper.js';
import * as $ from 'jquery';
import queryString from 'query-string';
import io from 'socket.io-client';

let socket;


const PlayerJoin = ({ token, name, room }) => {

  const [device, setDevice] = useState('');
  const [playing, setPlaying] = useState('');
  const [item, setItem] = useState('');
  const [progress, setProgress] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [image, setImage] = useState('');
  const [fetchDate, setFetchDate] = useState();
  const [data, setData] = useState({});

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
        setFetchDate(Date.now());
        setArtist(data.item.artists[0].name);
        setAlbum(data.item.album.name);
        setImage(data.item.album.images[0].url);
        setData(data);
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
        console.log("Status: " + error);
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
    playing ? pauseCurrent(token) : playCurrent(token);
  }

  const checkPermission = () => {
    const url = window.location.href;
    return url.includes('join') ? false : true;
  }

  useEffect(() => {
    getDevices(token);
    getCurrentlyPlaying(token);
    checkPermission();
  }, [])

  
  const ENDPOINT = 'localhost:8081';

  useEffect(() => {

    socket = io(ENDPOINT);


    socket.emit('join', { name, room }, () => {});

      // on dismount of component
    return () => {
        socket.emit('disconnect');
        socket.off();
    }
  }, [ENDPOINT]);

  useEffect(() => {
    socket.on('test', (message) => {
        console.log('test', message);
    });
    sendData(data);
  }, [data]);

  const sendData = (data) => {
    socket.emit('sendData', data, () => {
      console.log('data', data);
    });
  };

  const backgroundStyles = {
    backgroundImage: `url(${image})`,
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
            <ProgressBar
              fetchDate={fetchDate}
              progress={progress}
              item={item}
              playing={playing}
            />
          <div className='background' style={backgroundStyles} />{' '}
        </div>
        {(checkPermission()) ?
        <button 
        type='button' 
        className='btn btn--pause-play'
        onClick={() => {
          handlePausePlay();
        }}
        >
        {playing ? 'Pause' : 'Play'}
      </button> : null}
      </div>

    </div>
  );
}

export default PlayerJoin;
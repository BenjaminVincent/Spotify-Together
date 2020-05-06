import React, { useState, useEffect } from 'react';
import Player from './Player';
import Chat from './Chat';
import queryString from 'query-string';
import { filterDevices } from '../helpers/player-helper.js';
import * as $ from 'jquery';
import io from 'socket.io-client';

let socket;


const Session = ({ token }) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [device, setDevice] = useState('');
  const [playing, setPlaying] = useState('');
  const [item, setItem] = useState('');
  const [progress, setProgress] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [image, setImage] = useState('');
  const [fetchDate, setFetchDate] = useState();
  const [data, setData] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const ENDPOINT = 'https://listen-together-music.herokuapp.com/';
  // 'https://listen-together-music.herokuapp.com/'
  // 'http://localhost:8081/'
  // 'https://listen-together-music.herokuapp.com/'

  const host = !window.location.href.includes('join');



  // API Calls
  ////////////////////////////////////////////////////////////////////////

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

  //Socket.io
  //////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room }, () => {});

    // on dismount of component
    return () => {
        socket.emit('disconnect');
        socket.off();
    }
}, [ENDPOINT]);

  useEffect(() => {
      socket.on('message', (message) => {
          console.log('message', message);
          setMessages(messages => [...messages, message]);
      });

      if(!host) {
        socket.on('data', (song_data) => {
            console.log('data', song_data);
            console.log('data', song_data.is_playing);
            setPlaying(song_data.is_playing);
            setItem(song_data.item);
            setProgress(song_data.progress_ms);
            setFetchDate(Date.now());
            setArtist(song_data.item.artists[0].name);
            setAlbum(song_data.item.album.name);
            setImage(song_data.item.album.images[0].url);
            setData(song_data);
        });
      }
  }, []);

  const sendMessage = (event) => {
      event.preventDefault();
      if (message) {
          socket.emit('sendMessage', message, () => {
              setMessage('');
          });
      }
  };

  const sendData = () => {
    socket.emit('sendData', data, () => {

    });
  };


  //Other functions
  /////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    setName(name);
    setRoom(room);

    getDevices(token);
    getCurrentlyPlaying(token);
  }, [])

  const handlePausePlay = () => {
    playing ? pauseCurrent(token) : playCurrent(token);
  }

  return (
    <div>
      <div className='host-session'>
        <div>Host: {name}</div>
        <div>Room: {room}</div>
        <Player
          playing={playing}
          item={item}
          progress={progress}
          artist={artist}
          album={album}
          image={image}
          fetchDate={fetchDate}
          handlePausePlay={handlePausePlay}
          sendData={sendData}
          host={host}
          />              

        {/* <div className='joinOuterContainer'><Chat
          message={message}
          setMessage={setMessage}
          messages={messages}
          sendMessage={sendMessage}
          name={name}
        /></div> */}
      </div>
    </div>
  )
}

export default Session;
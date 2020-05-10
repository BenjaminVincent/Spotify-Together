import React, { useState, useEffect, useRef } from 'react';
import Player from './Player';
import Chat from './Chat';
import queryString from 'query-string';
import { filterDevices } from '../helpers/player-helper.js';
import * as $ from 'jquery';
import io from 'socket.io-client';

let socket;


const Session = ({ token, device }) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [playing, setPlaying] = useState('');
  const [item, setItem] = useState('');
  const [song, setSong] = useState('');
  const [uri, _setUri] = useState('');
  const [progress, _setProgress] = useState('');
  const [duration, setDuration] = useState('');
  const [artist, setArtist] = useState('');
  const [album, setAlbum] = useState('');
  const [image, setImage] = useState('');
  const [fetchDate, setFetchDate] = useState();
  const [songData, _setSongData] = useState({});
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);

  const songDataRef = useRef(songData);
  const uriRef = useRef(uri);
  const progressRef = useRef(progress);
 
  const setSongData = (data) => {
    songDataRef.current = data;
    _setSongData(data);
  }

  const setUri = (data) => {
    uriRef.current = data;
    _setUri(data);
  }

  const setProgress = (data) => {
    progressRef.current = data;
    _setProgress(data);
  }

  const ENDPOINT = 'https://listen-together-music.herokuapp.com/';

  const host = !window.location.href.includes('join');

  async function getCurrentlyPlaying(token) {
    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      method: 'GET', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        }
    })    
    const data = await res.json();
    setPlaying(data.is_playing);
    setItem(data.item);
    setSong(data.item.name);
    setUri(data.item.uri);
    setProgress(data.progress_ms);
    setDuration(data.item.duration_ms);
    setFetchDate(Date.now());
    setArtist(data.item.artists[0].name);
    setAlbum(data.item.album.name);
    setImage(data.item.album.images[0].url);
    setSongData(data);
    return data;
  }

  const pauseCurrent = (token) => {
    $.ajax({
      url: `https://api.spotify.com/v1/me/player/pause?device_id=${device}`,
      type: 'PUT',
      dataType: 'json',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        if (host) getCurrentlyPlaying(token);
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
      dataType: 'json',
      beforeSend: xhr => {
        xhr.setRequestHeader('Authorization', 'Bearer ' + token);
        console.log('uri from playCurrrent', uriRef);
        if (host) getCurrentlyPlaying(token).then((isPlay) => console.log('data from playCurrent', isPlay));
      },
      data: JSON.stringify(
        {
          'uris': [uriRef.current],
          'position_ms': progressRef.current,
        }
      ),
      success: () => {
        setPlaying(true);
      }
    });
}

  //Other functions
  /////////////////////////////////////////////////////////////////////////

  const handlePausePlay = () => {
    playing ? pauseCurrent(token) : playCurrent(token);
  }

  //Socket.io
  //////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT); //server endpoint (heroku)
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
    if (host) {
      getCurrentlyPlaying(token);
    }

    socket.on('message', (message) => {
        console.log('message', message);
        if (message.user === 'admin' && message.text.includes('has joined!')) {
          console.log('inside message conditional');
          getCurrentlyPlaying(token);
          sendSongData();
        }
        setMessages(messages => [...messages, message]);
    });

      if(!host) {

        socket.on('data', (song_data) => {
            song_data = song_data.current;
            setItem(song_data.item);
            setSong(song_data.item.name);
            setUri(song_data.item.uri);
            setProgress(song_data.progress_ms);
            setDuration(song_data.item.duration_ms);
            setFetchDate(Date.now());
            setArtist(song_data.item.artists[0].name);
            setAlbum(song_data.item.album.name);
            setImage(song_data.item.album.images[0].url);
            setSongData(song_data); 
            console.log('listener data:', song_data);
            playCurrent(token);
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

  const sendSongData = () => {
    socket.emit('sendSongData', songDataRef, () => {
      console.log('Host data:', songDataRef);
    });
  };

  return (
    <div>
      <div className='host-session'>
        <div>Host: {name}</div>
        <div>Room: {room}</div>
        <Player
          playing={playing}
          item={item}
          song={song}
          duration={duration}
          progress={progress}
          artist={artist}
          album={album}
          image={image}
          fetchDate={fetchDate}
          handlePausePlay={handlePausePlay}
          sendSongData={sendSongData}
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
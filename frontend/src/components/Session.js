import React, { useState, useEffect, useRef, useDebugValue } from 'react';
import Player from './Player';
import Chat from './Chat';
import queryString from 'query-string';
import { FaAngleLeft } from 'react-icons/fa';
import * as $ from 'jquery';
import io from 'socket.io-client';
import '../styles/Session.css';
import { Redirect } from 'react-router-dom';

let socket;

const Session = ({ token, device }) => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [hostName, _setHostName] = useState('');
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
  const [userProfile, setUserProfile] = useState('');
  const [end, setEnd] = useState(false);

  const songDataRef = useRef(songData);
  const uriRef = useRef(uri);
  const progressRef = useRef(progress);
  const hostNameRef = useRef(hostName);
 
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

  const setHostName = (data) => {
    hostNameRef.current = data;
    _setHostName(data);
  }

  // const ENDPOINT = 'http://localhost:5000';

  const ENDPOINT = 'https://listen-together-music.herokuapp.com/';


  const host = !window.location.href.includes('join');


  async function getUserInfo(token) {
    const res = await fetch('https://api.spotify.com/v1/me', {
      method: 'GET',
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        }
    });
    const data = await res.json();
    console.log('getUserInfo:', data);
    // setUserProfile(data.images[0].url || null);
    return data;
  }


  async function getCurrentlyPlaying(token) {
    const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
      method: 'GET', 
      headers: {
        'Accept': 'application/json',
        'Content-Type': 'application/json',
        'Authorization': 'Bearer ' + token,
        }
    });    
    const data = await res.json();
    sendSongData(data);
    // console.log('is_playing from getCurrentlyPlaying:', data.is_playing);
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
        // console.log('uri from playCurrrent', uriRef);
        if (host) getCurrentlyPlaying(token);
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

  async function handlePausePlay() {
    if (playing) {
      await pauseCurrent(token);
    } else {
      await playCurrent(token);
    } 
  }

  //Socket.io
  //////////////////////////////////////////////////////////////////////////////

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT); //server endpoint (heroku)
    setName(name);
    setRoom(room);

    socket.emit('join', { name, room, host }, () => {});

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
          async function handleSong() {
            await getUserInfo(token);
            let results = await getCurrentlyPlaying(token);
            // console.log('results:', results);
            results.is_playing = !results.is_playing
            await sendSongData(results);
            return;
          }
          async function handleJoiner() {
            await playCurrent(token);
            return;
          }
        if (host) handleSong();
        if (!host) handleJoiner();
        }

        if (message.user === 'admin' && message.text.includes(`${hostNameRef.current} has left.`)) {
          console.log('hostName', hostNameRef.current);
          setEnd(true);
        }

        setMessages(messages => [...messages, message]);
    });

    if(!host) {

      socket.on('data', (song_data) => {
          // song_data = song_data.current;
          setItem(song_data.item || 'not found');
          setSong(song_data.item.name);
          setUri(song_data.item.uri);
          setProgress(song_data.progress_ms);
          setDuration(song_data.item.duration_ms);
          setFetchDate(Date.now());
          setPlaying(song_data.is_playing);
          setArtist(song_data.item.artists[0].name);
          setAlbum(song_data.item.album.name);
          setImage(song_data.item.album.images[0].url);
          setSongData(song_data);
          // console.log('listener data from socket call:', song_data.is_playing, song_data.progress_ms);
          if (!song_data.is_playing) {
            playCurrent(token);
          } else {
            pauseCurrent(token);
          }
      });
    }

    socket.on("roomData", ({ users, hostName }) => {
      setUsers(users);
      setHostName(hostName);
      console.log('users', users);
    });

  }, []);

  const sendMessage = (event) => {
      event.preventDefault();
      if (message) {
          socket.emit('sendMessage', message, () => {
              setMessage('');
          });
      }
  };

  const sendSongData = (d) => {
    // getCurrentlyPlaying(token);
    socket.emit('sendSongData', d, () => {
      // console.log('Host is_playing:', songDataRef.current.is_playing, songDataRef.current.progress_ms);
      // console.log('sendSongData:', d);
    });
  };

  return (
    <div>
      <div className='session-container'>
      {end ? 
        <Redirect to='/end'/>
      : <div>
          <div className='session-info'>
            <a className='session-info-spacing' href='/'><FaAngleLeft color='white' size='2em'/></a>
            <div className='session-info-spacing'>Host: {hostName}</div>
            <div className='session-info-spacing'>Room: {room}</div>
            {/* <img className='user-profile session-info-spacing' src={'../../public/user-circle-icon'}></img> */}
          </div>
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
          <div className='joinOuterContainer'><Chat
            message={message}
            setMessage={setMessage}
            messages={messages}
            sendMessage={sendMessage}
            name={name}
          />
          </div>
        </div>}
      </div>
    </div>
  )
}

export default Session;
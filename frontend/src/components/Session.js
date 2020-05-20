import React, { useState, useEffect, useRef, useDebugValue } from 'react';
import Player from './Player';
import Chat from './Chat';
import HandleError from './HandleError'; 
import queryString from 'query-string';
import { FaAngleLeft } from 'react-icons/fa';
import * as $ from 'jquery';
import io from 'socket.io-client';
import '../styles/Session.css';
import { Redirect } from 'react-router-dom';
import { getCurrentlyPlaying, playCurrent, pauseCurrent, getUserInfo } from '../helpers/player-helper';

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

  const ENDPOINT = 'http://localhost:5000';

  // const ENDPOINT = 'https://listen-together-music.herokuapp.com/';


  const host = !window.location.href.includes('join');

  const updateData = (data) => {
    sendSongData(data);
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
    console.log('data', data);
  }

  const handlePausePlay = async () => {
    const data = await getCurrentlyPlaying(token);
    updateData(data);
    const playState = playing ? 'Play' : 'Pause';
    const res = await (playing ? pauseCurrent(token) : playCurrent(token, uriRef, progressRef));
    if (res instanceof Error) {
      console.log(`${playState} error`, res);
    } else {
      res.ok ? setPlaying(prevPlaying => !prevPlaying) : console.log('Play error', res.status);
    }
  }

  const handleEnterRoom = async () => {
    if (host) {
      const data = await getCurrentlyPlaying(token);
      updateData(data);
    }

    const res = await getUserInfo(token);
    if (res.ok) {
      const data = await res.json();
      console.log('userinfo', data);
      if(!data.images.length) setUserProfile(data.images[0].url);
    } else {
      console.log('GetUserInfo error', res.status);
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
    // pause music if user leaves room
    window.addEventListener('beforeunload', (event) => {
      pauseCurrent(token);
    });
  }, []);

  useEffect(() => {
    handleEnterRoom();

    socket.on('message', (message) => {
        console.log('message', message);

        if (message.user === 'admin' && message.text.includes('has joined!')) {
          async function handleSong() {
            let results = await getCurrentlyPlaying(token);
            // console.log('results:', results);
            results.is_playing = !results.is_playing
            await sendSongData(results);
            return;
          }
          async function handleJoiner() {
            await playCurrent(token, uriRef, progressRef);
            return;
          }
        if (host) handleSong();
        if (!host) handleJoiner();
        }

        if (message.user === 'admin' && message.text.includes(`${hostNameRef.current} has left.`)) {
          console.log('hostName', hostNameRef.current);
          setEnd(true);
          pauseCurrent(token);
        }

        setMessages(messages => [...messages, message]);
    });

    if(!host) {

      socket.on('data', (song_data) => {
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
          if (!song_data.is_playing) {
            playCurrent(token, uriRef, progressRef);
          } else {
            pauseCurrent(token);
          }
          console.log(song_data);
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
    socket.emit('sendSongData', d, () => {
      console.log(d);
    });
  };

  return (
    <div className='entire-session'>

      {end ? 
        <Redirect to='/end'/>
      : <div className='session-container'>
          <div className='session-info'>
            <a className='session-info-spacing' href='/'><FaAngleLeft color='white' size='2em'/></a>
            <div className='session-info-spacing'>Host: {hostName}</div>
            <div className='session-info-spacing'>Room: {room}</div>
            {/* <img className='user-profile session-info-spacing' src={'../../public/user-circle-icon'}></img> */}
          </div>
            <div className='player-window'>
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
                host={host}
                />
              </div>
              <div className='chat-window'>     
              <Chat
                message={message}
                setMessage={setMessage}
                messages={messages}
                sendMessage={sendMessage}
                name={name}
                users={users}
              />
            </div>
        </div>}

    </div>
  )
}

export default Session;
import React, { useState, useEffect, useRef, useDebugValue } from 'react';
import Player from './Player';
import Chat from './Chat';
import Queue from './Queue/Queue';
import RequestQueue from './Queue/RequestQueue';
import queryString from 'query-string';
import { FaAngleLeft } from 'react-icons/fa';
import io from 'socket.io-client';
import '../styles/Session.css';
import { Redirect } from 'react-router-dom';
import { getCurrentlyPlaying, playCurrent, pauseCurrent, getUserInfo } from '../helpers/player-helper';

let socket;

const Session = ({ token }) => {
  const [song, _setSong] = useState({ 
    item: { 
      name: '',
      uri: '',
      duration_ms: '',
      artists: [{ name: '' }],
      album: {
        images: [{ url: '' }],
      },
    },
    progress_ms: '',
  });
  const [playing, _setPlaying] = useState('');
  const [fetchDate, setFetchDate] = useState();
  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [users, setUsers] = useState([]);
  const [hostName, _setHostName] = useState('');
  const [message, setMessage] = useState('');
  const [messages, setMessages] = useState([]);
  const [userProfile, setUserProfile] = useState('');
  const [end, setEnd] = useState(false);
  const [queue, _setQueue] = useState([]);
  const [requestQueue, _setRequestQueue] = useState([]);

  const songRef = useRef(song);
  const hostNameRef = useRef(hostName);
  const playingRef = useRef(playing);
  const queueRef = useRef(queue);
  const requestQueueRef = useRef(requestQueue);
 
  const setSong = (data) => {
    songRef.current = data;
    _setSong(data);
  };

  const setHostName = (data) => {
    hostNameRef.current = data;
    _setHostName(data);
  };

  const setPlaying = (data) => {
    playingRef.current = data;
    _setPlaying(data);
  };

  const setQueue = (data) => {
    queueRef.current = data;
    _setQueue(data);
  }

  const addToQueue = (data) => {
    queueRef.current = [...queueRef.current, data];
    _setQueue(queue => [...queue, data]);
    if (host) sendQueueData(queueRef.current);
  };

  // Delete song => make sure it doesn't delete all tracks with name uri (2 of same song)
  const removeFromQueue = (uri) => {
    queueRef.current = queueRef.current.filter((track) => track.uri !== uri);
    _setQueue(queue => queue.filter((track) => track.uri !== uri));
    if (host) sendQueueData(queueRef.current);
  };

  const removeFirstInQueue = () => {
    queueRef.current = queueRef.current.filter((_, i) => i !== 0);
    _setQueue(queue => queue.filter((_, i) => i !== 0));
  }

  const addToRequestQueue = (data) => {
    requestQueueRef.current = [...requestQueueRef.current, data];
    _setRequestQueue(requestQueue => [...requestQueue, data]);
  };

  const removeFromRequestQueue = (uri) => {
    requestQueueRef.current = requestQueueRef.current.filter((track) => track.uri !== uri);
    _setRequestQueue(requestQueue => requestQueue.filter((track) => track.uri !== uri));
  };



  const ENDPOINT = 'http://localhost:5000';

  // const ENDPOINT = 'https://listen-together-music.herokuapp.com/';


  const host = !window.location.href.includes('join');

  const updateSong = (data) => {
    setSong(data);
    setPlaying(data.is_playing);
    setFetchDate(Date.now());
  };

  const handlePausePlay = async () => {
    if (host) {
      const data = await getCurrentlyPlaying(token);
      updateSong(data);
      sendSongData(data, 1);
    }
    const res = await (playingRef.current ? pauseCurrent(token) : playCurrent(token, queueRef.current[0].uri, songRef.current.progress_ms));
    if (res instanceof Error) {
      console.log('Pause/play error', res);
    } else {
      res.ok ? setPlaying(!playingRef.current) : console.log('Pause/play error', res.status);
    }
    // console.log('playing', playingRef.current);
  };

  const handleSkip = async () => {
    await handlePlayNext();
    socket.emit('skipData', 'skipped', () => {});
  };

  const handlePlayNext = async () => {

    if (queueRef.current.length > 1) {
        await removeFirstInQueue();

      if (!host) {
        // console.log('in HandlePlayNext listener:', queueRef.current);
      }
      const res = await (playCurrent(token, queueRef.current[0].uri, 0));

      if (res instanceof Error) {
        console.log('Play error', res);
      } else {
        res.ok ? setPlaying(true) : console.log('Play error', res.status);
      }
      await setTimeout(() => getAndUpdateSong(), 500);
  }};

  const getAndUpdateSong = async () => {
    const data = await getCurrentlyPlaying(token);
    updateSong(data);
    // sendSongData(data, 2); // calls a skip
  };

  const handleEnterRoom = async () => {
    if (host) {
      const data = await getCurrentlyPlaying(token);
      updateSong(data);
      addToQueue(data.item);
    }

    const res = await getUserInfo(token);
    if (res.ok) {
      const data = await res.json();
      // console.log('userinfo', data);
      if (!data.images.length) setUserProfile(data.images[0].url);
    }
  };

  const handleNewUser = async () => {
    // console.log('handleNewUser is called');
    const data = await getCurrentlyPlaying(token);
    // data.is_playing = !data.is_playing;
    sendSongData(data, 0);
    sendQueueData(queueRef.current);
  };

  const sendMessage = (event) => {
    event.preventDefault();
    if (message) {
        socket.emit('sendMessage', message, () => {
            setMessage('');
        });
    }
  };

  const sendSongData = (songData, action) => {
    socket.emit('sendSongData', { songData, action }, () => {
      // console.log('songData initial send', songData);
    });
  };

  const sendQueueData = (d) => {
    socket.emit('queueData', d, () => {
      // console.log('queueData', d);
    });
  };

  const sendSongRequest = (track) => {
    socket.emit('requestData', track, () => {
      console.log('Send requestData', track);
    })
  }

  useEffect(() => {
    const { name, room } = queryString.parse(window.location.search);

    socket = io(ENDPOINT);
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
    handleEnterRoom();

    window.addEventListener('beforeunload', (event) => {
      pauseCurrent(token);
    });

    socket.on('messageData', (message) => {
        // console.log('messageData', message);

        if (message.user === 'admin' && message.text.includes('has joined!') && host) {
          handleNewUser();
        }

        if (message.user === 'admin' && message.text.includes(`${hostNameRef.current} has left.`)) {
          setEnd(true);
          pauseCurrent(token);
        }

        setMessages(messages => [...messages, message]);
    });

    if (!host) {
      socket.on('songData', ({ songData, action }) => {

        if (action === 0) { // new user
          
          // console.log('0', songData);
          updateSong(songData);
          if (!queueRef.current.length) addToQueue(songData.item);
          songData.is_playing ? playCurrent(token, songData.item.uri, songData.progress_ms) : pauseCurrent(token);
        }

        if (action === 1) { // pause/play
          // console.log('1', songData);
          updateSong(songData);
          console.log('listener songData', songData);
          handlePausePlay();
        } 
        
        if (action === 2) { // skip
          // console.log('2', songData);
          updateSong(songData);
          playCurrent(token, songData.item.uri, songData.progress_ms);
        }

      });
    }

    socket.on('roomData', ({ users, hostName }) => {
      setUsers(users);
      setHostName(hostName);
    });

    socket.on('requestData', (data) => {
      addToRequestQueue(data);
      console.log('request data', data);
    });

    if (!host) {
      socket.on('queueData', (data) => {
        setQueue(data);
        // console.log('listener queueData', data);
      });

      socket.on('skipData', (data) => {
        handlePlayNext();
      });
    }
  }, []);

  return (
    <div className='entire-session'>
      {end ? 
        <Redirect to='/end'/>
      : <div className='session-container'>
          <div className='thing'>
            <div className='session-info'>
              <a className='session-info-spacing-leave' href='/'><FaAngleLeft color='white' size='2em'/></a>
              <div className='session-info-spacing'>Host: {hostName}</div>
              <div className='session-info-spacing'>Room: {room}</div>
            </div>
            <div className='session-queue'>
            <Queue 
              token={token}
              host={host}
              queue={queue}
              addToQueue={addToQueue}
              removeFromQueue={removeFromQueue}
            />
            <RequestQueue
              token={token}
              host={host}
              requestQueue={requestQueue}
              addToQueue={addToQueue}
              addToRequestQueue={addToRequestQueue}
              removeFromRequestQueue={removeFromRequestQueue}
              sendSongRequest={sendSongRequest}
            />
            </div>
          </div>
          <div className='player-window'>
            <Player
              playing={playing}
              item={song.item}
              song={song.item.name}
              duration={song.item.duration_ms}
              progress={song.progress_ms}
              artist={song.item.artists[0].name}
              image={song.item.album.images[0].url}
              fetchDate={fetchDate}
              handlePausePlay={handlePausePlay}
              host={host}
              song={song}
              handleSkip={handleSkip}
              handlePlayNext={handlePlayNext}
              songRef={songRef}
              queueRef={queueRef}
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
        </div>
      }
    </div>
  );
};

export default Session;
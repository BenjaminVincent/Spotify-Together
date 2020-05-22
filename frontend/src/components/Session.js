import React, { useState, useEffect, useRef, useDebugValue } from 'react';
import Player from './Player';
import Chat from './Chat';
import Queue from './Queue/Queue';
import queryString from 'query-string';
import { FaAngleLeft } from 'react-icons/fa';
import io from 'socket.io-client';
import '../styles/Session.css';
import { Redirect } from 'react-router-dom';
import { getCurrentlyPlaying, playCurrent, pauseCurrent, getUserInfo } from '../helpers/player-helper';

let socket;

const Session = ({ token }) => {
  const [songData, _setSongData] = useState({ 
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

  const songDataRef = useRef(songData);
  const hostNameRef = useRef(hostName);
  const playingRef = useRef(playing);
  const queueRef = useRef(queue);
 
  const setSongData = (data) => {
    songDataRef.current = data;
    _setSongData(data);
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
  };

  const removeFirstInQueue = () => {
    queueRef.current = queueRef.current.filter((_, i) => i !== 0);
    _setQueue(queue => queue.filter((_, i) => i !== 0));
  }

  // Delete song => make sure it doesn't delete all tracks with name uri (2 of same song)
  const removeFromQueue = (uri) => {
      queueRef.current = queueRef.current.filter((track) => track.uri !== uri);
      _setQueue(queue => queue.filter((track) => track.uri !== uri));
  };


  // const ENDPOINT = 'http://localhost:5000';

  const ENDPOINT = 'https://listen-together-music.herokuapp.com/';


  const host = !window.location.href.includes('join');

  const updateData = (data) => {
    setSongData(data);
    setPlaying(data.is_playing);
    setFetchDate(Date.now());
  };

  const handlePausePlay = async () => {
    if (host) {
      const data = await getCurrentlyPlaying(token);
      updateData(data);
      sendSongData(data);
    }
    const res = await (playingRef.current ? pauseCurrent(token) : playCurrent(token, queueRef, songDataRef.current.progress_ms));
    if (res instanceof Error) {
      console.log('Pause/play error', res);
    } else {
      res.ok ? setPlaying(!playingRef.current) : console.log('Pause/play error', res.status);
    }
    console.log('playing', playingRef.current);
  };

  // Remove first song in queue and play next
  const handlePlayNext = async () => {
    // if last song don't call playCurrent will cause error (uris empty)
    if (queueRef.current.length > 1) {
      if (host) removeFirstInQueue();
      const res = await (playCurrent(token, queueRef, 0));

      if (res instanceof Error) {
        console.log('Play error', res);
      } else {
        res.ok ? setPlaying(true) : console.log('Play error', res.status);
      }
      setTimeout(() => getAndUpdateData(), 500);
  }}

  const getAndUpdateData = async () => {
    const data = await getCurrentlyPlaying(token);
    updateData(data);
  }

  const handleEnterRoom = async () => {
    if (host) {
      const data = await getCurrentlyPlaying(token);
      updateData(data);
      addToQueue(data.item);
      // setQueueData(queueData => [...queueData, data.item])
    }

    const res = await getUserInfo(token);
    if (res.ok) {
      const data = await res.json();
      console.log('userinfo', data);
      if (!data.images.length) setUserProfile(data.images[0].url);
    } else {
      console.log('GetUserInfo error', res.status);
    }
  };

  const handleNewUser = async () => {
    const data = await getCurrentlyPlaying(token);
    data.is_playing = !data.is_playing
    sendSongData(data);
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

  const sendSongData = (d) => {
    socket.emit('sendSongData', d, () => {
      console.log('sendSongData', d);
    });
  };

  const sendQueueData = (d) => {
    socket.emit('queueData', d, () => {
      console.log('queueData', d);
    });
  };

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
    handleEnterRoom();

    // pause music if user leaves room
    window.addEventListener('beforeunload', (event) => {
      pauseCurrent(token);
    });

    socket.on('message', (message) => {
        console.log('message', message);

        if (message.user === 'admin' && message.text.includes('has joined!') && host) {
          handleNewUser();
        }

        if (message.user === 'admin' && message.text.includes(`${hostNameRef.current} has left.`)) {
          console.log('hostName', hostNameRef.current);
          setEnd(true);
          pauseCurrent(token);
        }

        setMessages(messages => [...messages, message]);
    });

    if (!host) {
      socket.on('data', (data) => {
        updateData(data);
        if (!queueRef.current.length) addToQueue(data.item);
        handlePausePlay();
        console.log('listener progess', data.progress_ms);
      });
    }

    socket.on("roomData", ({ users, hostName }) => {
      setUsers(users);
      setHostName(hostName);
      console.log('users', users);
    });

    if (!host) {
      socket.on("queueData", (data) => {
        setQueue(data);
        console.log('listener queue data', data);
      });
    }
  }, []);

  useEffect(() => {
    if (host) sendQueueData(queueRef.current);
  }, [queue]);

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
              song={songData.item.name}
              artist={songData.item.artists[0].name}
              image={songData.item.album.images[0].url}
              uri={songData.item.uri}
              queue={queue}
              addToQueue={addToQueue}
              // queueData={queueData}
              // setQueueData={setQueueData}
              removeFromQueue={removeFromQueue}
              host={host}
            />
            </div>
          </div>
          <div className='player-window'>
            <Player
              playing={playing}
              item={songData.item}
              song={songData.item.name}
              duration={songData.item.duration_ms}
              progress={songData.progress_ms}
              artist={songData.item.artists[0].name}
              image={songData.item.album.images[0].url}
              fetchDate={fetchDate}
              handlePausePlay={handlePausePlay}
              host={host}
              songData={songData}
              handlePlayNext={handlePlayNext}
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
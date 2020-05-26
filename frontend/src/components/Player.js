import React from 'react';
import ProgressBar from './ProgressBar';
import '../styles/Player.css';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { BsFillSkipEndFill } from "react-icons/bs";

const Player = ({
  playing,
  item,
  song,
  progress,
  duration,
  artist,
  image,
  fetchDate,
  handlePausePlay,
  host,
  songData,
  sendSongData,
  sendQueueData,
  handlePlayNext,
  songDataRef,
  queueRef,
}) => {

  const backgroundStyles = {
    backgroundImage: `url(${image})`,
  };

  console.log('songDataRef', songDataRef);
  console.log('QRef', queueRef);

  return (
      <div className='main-wrapper'>
        <div className='now-playing__img'>
          <img src={image} alt='not found'/>
        </div>
        <div className='now-playing__side'>
          <div className='now-playing__name'>{songData.item.name}</div>
          <div className='now-playing__artist'>{artist}<br/></div>
          <ProgressBar
            fetchDate={fetchDate}
            progress={progress}
            duration={duration}
            item={item}
            playing={playing}
            handlePlayNext={handlePlayNext}
          />
          <div className='background' style={backgroundStyles} />
        </div>
        {
        host ?
        <div className='player-controls'>
        <div 
        className='pause-play-btn'
        onClick={() => {
          handlePausePlay();
        }}
        >
        {playing ? <FaPauseCircle size='3em'/> : <FaPlayCircle size='3em'/>}
      </div>
      <div className='skip-btn'>
        <BsFillSkipEndFill
          size='2em'
          onClick={() => {
            handlePlayNext();
            sendSongData(songDataRef.current);
            sendQueueData(queueRef.current);
          }}  
        />
      </div>
      </div>
      :
      null
      }
      </div>
  );
}

export default Player;
import React from 'react';
import ProgressBar from './ProgressBar';
import '../styles/Player.css';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { BsFillSkipEndFill } from "react-icons/bs";

const Player = ({
  playing,
  item,
  progress,
  duration,
  artist,
  image,
  fetchDate,
  handlePausePlay,
  host,
  song,
  handlePlayNext,
  handleSkip,
}) => {

  const backgroundStyles = {
    backgroundImage: `url(${image})`,
  };

  return (
      <div className='main-wrapper'>
        <div className='song-info'>
        <div className='now-playing__img'>
          <img src={image} alt='not found'/>
        </div>
        <div className='now-playing__side'>
          <div className='now-playing__name'>{song.item.name}</div>
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
        {playing ? <FaPauseCircle size='80px'/> : <FaPlayCircle size='80px'/>}
      </div>
      <div className='skip-btn'>
        <BsFillSkipEndFill
          size='2em'
          onClick={() => {
            handleSkip();
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
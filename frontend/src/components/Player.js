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
      <div className='player-wrapper'>
        <div className='song-info-container'>
          <img className='album-cover' src={image} alt='not found'/>
        <div className='title-container'>
          <div className='song-name'>{song.item.name}</div>
          <div className='artist-name'>{artist}<br/></div>
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
            size='35px'
            onClick={() => {
              handleSkip();
            }}  
          />
        </div>
      </div>
      :
      null
      }
    <div className='progress'>
      <ProgressBar
        fetchDate={fetchDate}
        progress={progress}
        duration={duration}
        item={item}
        playing={playing}
        handlePlayNext={handlePlayNext}
      />
    </div>
      </div>
  );
}

export default Player;
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
    <div className='player-container'>
      <div className='title-container'>
        <img className='album-cover' src={image} alt='not found'/>
        <div className="text-container">
          <div className='song-name'>{song.item.name}</div>
          <div className='artist-name'>{artist}<br/></div>
        </div>
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
          {playing ? <FaPauseCircle size='50px'/> : <FaPlayCircle size='50px'/>}
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
        <ProgressBar
          fetchDate={fetchDate}
          progress={progress}
          duration={duration}
          item={item}
          playing={playing}
          handlePlayNext={handlePlayNext}
        />
    </div>
  );
}

export default Player;
import React from 'react';
import ProgressBar from './ProgressBar';
import '../styles/Player.css';
import { FaPauseCircle, FaPlayCircle } from 'react-icons/fa';
import { BsFillSkipEndFill } from "react-icons/bs";
import VolumeControl from './VolumeControl';

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

  return (
    <div className='player-container'>
      <div className='title-container'>
        <img className='album-cover' src={image} alt='not found'/>
        <div className="text-container">
          <div className='song-name'>{song.item.name}</div>
          <div className='artist-name'>{artist}<br/></div>
        </div>
        </div>

        {
        host ?
        <div className='player-controls'>
          <div className='inner-player-controls'>
            <div 
            className='pause-play-btn'
            onClick={() => {
              handlePausePlay();
            }}
            >
            {playing ? <FaPauseCircle size='52px'/> : <FaPlayCircle size='52px'/>}
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
        <ProgressBar
          fetchDate={fetchDate}
          progress={progress}
          duration={duration}
          item={item}
          playing={playing}
          handlePlayNext={handlePlayNext}
        />
      </div>
      :
      null
    //   <ProgressBar
    //   fetchDate={fetchDate}
    //   progress={progress}
    //   duration={duration}
    //   item={item}
    //   playing={playing}
    //   handlePlayNext={handlePlayNext}
    // />
      }
    <VolumeControl/>
    </div>
  );
}

export default Player;
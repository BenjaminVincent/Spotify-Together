import React from 'react';
import ProgressBar from './ProgressBar';
import '../styles/Player.css';


const PlayerHost = ({
  playing,
  item,
  progress,
  artist,
  album,
  image,
  fetchDate,
  handlePausePlay,
  sendData,
  host,
}) => {

  const backgroundStyles = {
    backgroundImage: `url(${image})`,
  };

  return (
    <div className='App'>
      <div className='main-wrapper'>
        <div className='now-playing__img'>
          <img src={image} alt='not found'/>
        </div>
        <div className='now-playing__side'>
          <div className='now-playing__name'>{item.name}</div>
          <div className='now-playing__artist'>
           Artist: {artist} <br/>
           Album: {album}
          </div>
            <ProgressBar
              fetchDate={fetchDate}
              progress={progress}
              item={item}
              playing={playing}
            />
          <div className='background' style={backgroundStyles} />{' '}
        </div>
        {
        <button 
        type='button' 
        className='btn btn--pause-play'
        onClick={() => {
          handlePausePlay();
          sendData();
        }}
        >
        {playing ? 'Pause' : 'Play'}
      </button>}
      </div>

    </div>
  );
}

export default PlayerHost;
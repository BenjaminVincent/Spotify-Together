import React, { useState, useEffect } from 'react';

const ProgressBar = ({ fetchDate, progress, duration, playing, handlePlayNext }) => {

  const [currentDate, setCurrentDate] = useState(Date.now());

  const progressBarStylesPlaying = {
    width: ((currentDate - fetchDate + progress) * 100 / duration) + '%'
  };

  const progressBarStylesPaused = {
    width: ((progress) * 100 / duration) + '%'
  };

  useEffect(() => {
      setInterval(() => setCurrentDate(Date.now()), 1000);
  }, [])

  useEffect(() => {
    // is song over? play next song
    if ((currentDate - fetchDate + progress) > duration && playing) {
      handlePlayNext();
      console.log('song end');
    }
  }, [currentDate])

  if (playing) {
    return (
    <div className='progress'>
      <div className='progress-bar' style={progressBarStylesPlaying} />
    </div>
    )
  } else {
    return (
    <div className='progress'>
      <div className='progress-bar' style={progressBarStylesPaused} />
    </div>
    )
  }
}

export default ProgressBar;
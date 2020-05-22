import React, { useState, useEffect } from 'react';

const ProgressBar = ({ fetchDate, progress, duration, playing, setSongEnd }) => {

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
    if ((currentDate - fetchDate + progress) > duration) {
      setSongEnd(true);
      console.log('song end');
    }
  }, [currentDate])

  if (playing) {
    return (
    <div className='progress'>
      <div className='progress__bar' style={progressBarStylesPlaying} />
    </div>
    )
  } else {
    return (
    <div className='progress'>
      <div className='progress__bar' style={progressBarStylesPaused} />
    </div>
    )
  }
}

export default ProgressBar;
import React from 'react';
import '../../styles/Queue.css';
/*
    A single song added to the queue
    
    Props:
        - song
        - artist
        - image

*/

const QueueItem = ({song, artist, image, uri, removeFromQueue}) => {
  return (
  <div className='queue-item'>
    <img className='queue-item-image' src={image} alt='not found'/>
    <div className='queue-item-info'>
      <div className='queue-item-song'>{song}</div>
      <div className='queue-item-artist'>{artist}</div>
      <div 
        onClick={() => {
          removeFromQueue(uri);
        }}
        >
        x
      </div>
    </div>
  </div>
  );
}

export default QueueItem;
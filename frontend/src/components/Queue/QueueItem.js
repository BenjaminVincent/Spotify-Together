import React from 'react';
import '../../styles/Queue.css';
import { FaRegWindowClose } from 'react-icons/fa';
/*
    A single song added to the queue
    
    Props:
        - song
        - artist
        - image

*/

const QueueItem = ({song, artist, image, uri, removeFromQueue, host}) => {
  return (
  <div>
  <div className='queue-item'>
    <img className='queue-item-image' src={image} alt='not found'/>
    <div className='queue-item-info'>
      <div className='queue-item-song'>{song}</div>
      <div className='queue-item-artist'>{artist}</div>
    </div>
    
  </div>
  {host ?
      <div className='queue-item-delete'
        onClick={() => {
          removeFromQueue(uri);
        }}
        >
        <FaRegWindowClose color='white' size='0.8em'/>
      </div>
      : null}
  </div>
  );
}

export default QueueItem;
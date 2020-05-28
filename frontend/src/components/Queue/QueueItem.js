import React from 'react';
import '../../styles/Queue.css';
import { FaRegWindowClose, FaRegCheckSquare } from 'react-icons/fa';
/*
    A single song added to the queue
    
    Props:
        - song
        - artist
        - image

*/

const QueueItem = ({track, song, artist, image, uri, addToQueue, removeFromQueue, removeFromRequestQueue, host, isRequest}) => {
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
    <div>
    {isRequest ? 
        <div className='queue-item-approve'
          onClick={() => {
            addToQueue(track);
            removeFromRequestQueue(uri);
          }}
        >
          <FaRegCheckSquare color='white' size='0.8em'/>
        </div> : null}
        <div className='queue-item-delete'
          onClick={() => {
            isRequest ? removeFromRequestQueue(uri) : removeFromQueue(uri);
          }}
          >
          <FaRegWindowClose color='white' size='0.8em'/>
        </div>
      </div>
      : null}
  </div>
  );
}

export default QueueItem;
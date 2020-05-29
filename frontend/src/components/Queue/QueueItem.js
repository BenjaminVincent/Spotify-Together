import React from 'react';
import '../../styles/Queue.css';
import { FaRegWindowClose } from 'react-icons/fa';

const QueueItem = ({track, removeFromQueue, host}) => {
  return (
    <div>
      <div className='queue-item'>
        <img className='queue-item-image' src={track.album.images[0].url} alt='not found'/>
        <div className='queue-item-info'>
          <div className='queue-item-song'>{track.name}</div>
          <div className='queue-item-artist'>{track.artists[0].name}</div>
        </div>
      </div>
      {host
        ? <div className='queue-item-delete'
            onClick={() => {
              removeFromQueue(track.uri);
            }}
          >
            <FaRegWindowClose color='white' size='0.8em'/>
          </div>
        : null
      }
    </div>
  );
}

export default QueueItem;
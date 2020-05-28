import React from 'react';
import '../../styles/Queue.css';
import { FaRegWindowClose, FaRegCheckSquare } from 'react-icons/fa';
/*
    A single song added to the request queue

*/

const RequestQueueItem = ({host, track, addToQueue, removeFromRequestQueue}) => {
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
          ? <div>
              <div className='queue-item-approve'
                onClick={() => {
                  addToQueue(track);
                  removeFromRequestQueue(track.uri);
                }}
              >
                <FaRegCheckSquare color='white' size='0.8em'/>
              </div>
              <div className='queue-item-delete'
                onClick={() => {
                  removeFromRequestQueue(track.uri);
                }}
              >
                <FaRegWindowClose color='white' size='0.8em'/>
              </div>
            </div>
          : null
        }
    </div>
  );
}

export default RequestQueueItem;
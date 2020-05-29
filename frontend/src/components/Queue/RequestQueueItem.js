import React from 'react';
import '../../styles/Queue.css';
import { FaRegWindowClose, FaRegCheckSquare } from 'react-icons/fa';
/*
    A single song added to the request queue

*/

const RequestQueueItem = ({
  host,
  track,
  addToQueue,
  removeFromRequestQueue,
  sendRequestStatus,
}) => {


  /* 
    Only shown for host; allows host to accept requested song.
    On click adds song to play queue, removes song from request queue,
    and sends new status ('Accepted') of request to the listener
    who requested the song.

  */
  const AcceptRequestButton = () => {
    if (host) {
      return (
        <div className='queue-item-accept'
          onClick={() => {
            addToQueue(track);
            removeFromRequestQueue(track.uri);
            sendRequestStatus(track, 'Accepted');
        }}
        >
          <FaRegCheckSquare color='white' size='0.8em'/>
        </div>
      )
    } else {
      return null;
    }
  }

  /* 
    For host: allows host to remove song from request queue.
    On click removes song from request queue and sends new status
    ('Denied') of request to listener who requested the song.

  */
  const RemoveRequestButton = () => {
    if (host) {
      return (
        <div className='queue-item-deny'
          onClick={() => {
            removeFromRequestQueue(track.uri);
            if (host) sendRequestStatus(track, 'Denied');
          }}
        >
          <FaRegWindowClose color='white' size='0.8em'/>
        </div>
      )
    } else {
      return null;
    }
  }

  return (
    <div>
      <div className='queue-item'>
        <img className='queue-item-image' src={track.album.images[0].url} alt='not found'/>
        <div className='queue-item-info'>
          <div className='queue-item-song'>{track.name}</div>
          <div className='queue-item-artist'>{track.artists[0].name}</div>
          {host 
            ? <div className='queue-item-artist'>{track.listenerName}</div>
            : <div className='queue-item-artist'>{track.status}</div>
          }
       </div>
      </div>
      <div>
        <AcceptRequestButton/>
        <RemoveRequestButton/>
      </div>
    </div>
  );
}

export default RequestQueueItem;
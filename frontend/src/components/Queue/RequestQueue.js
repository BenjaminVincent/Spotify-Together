import React from 'react';
import RequestQueueItem from './RequestQueueItem';
import Search from './Search';
/*
    For host, RequestQueue is intended to show all the songs that listeners have requested.
    For listener, RequestQueue displays personal song requests and their status.


    Functionality (for host only):
        - accept (move song from request queue to main queue)
        - deny (remove dong from request queue)

*/

const RequestQueue = ({
  token,
  host,
  requestQueue,
  addToQueue,
  addToRequestQueue,
  removeFromRequestQueue,
  sendSongRequest
}) => {

  const upNext = requestQueue.map(track => (
    <RequestQueueItem
      key={track.id}
      host={host}
      track={track}
      removeFromRequestQueue={removeFromRequestQueue}
      addToQueue={addToQueue}
    />
  ));

  return (
    <div className='queue-container'>
      {host
        ? null
        : <Search
            token={token}
            host={host}
            addToRequestQueue={addToRequestQueue}
            sendSongRequest={sendSongRequest}
          />
      }
      <div className='queue-title'>{host ? 'Pending songs:' : 'Requested songs:'}</div>
      {requestQueue.length ? <div className='queued-items'>{upNext}</div> : null}
    </div>
  );
}

export default RequestQueue;
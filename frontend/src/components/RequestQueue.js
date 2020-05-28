import React from 'react';
import QueueItem from './Queue/QueueItem';
import Search from './Queue/Search';
/*
    RequestQueue is intended to show all the songs that listeners have requested.

    functionality:
        - Approve
        - Reject

*/

const RequestQueue = ({token, host, requestQueue, addToQueue, addToRequestQueue, removeFromRequestQueue, sendSongRequest}) => {

  const upNext = requestQueue.map(track => (
    <QueueItem
      key={track.id}
      track={track}
      song={track.name}
      artist={track.artists[0].name}
      image={track.album.images[0].url}
      uri={track.uri}
      removeFromRequestQueue={removeFromRequestQueue}
      addToQueue={addToQueue}
      host={host}
      isRequest={true}
    />
  ));

  return (
  <div className='queue-container'>
    {host ? null :
      <Search
        token={token}
        addToRequestQueue={addToRequestQueue}
        host={host}
        sendSongRequest={sendSongRequest}
      />
    }
    <div className='queue-title'>{host ? 'Pending songs:' : 'Requested songs:'}</div>
    {requestQueue.length ? <div className='queued-items'>{upNext}</div> : null}
  </div>
  );
}

export default RequestQueue;
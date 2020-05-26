import React from 'react';
import QueueItem from './QueueItem';
import Search from './Search';
/*
    Queue is intended to show all the songs that the host has added to the queue.
    Play the next song in the queue.

    functionality:
        - Add
        - Remove
        - Clear

*/

const Queue = ({token, queue, addToQueue, removeFromQueue, host}) => {

  const upNext = queue.slice(1).map(track => (
    <QueueItem
      key={track.id}
      song={track.name}
      artist={track.artists[0].name}
      image={track.album.images[0].url}
      uri={track.uri}
      removeFromQueue={removeFromQueue}
      host={host}
    />
  ));

  return (
  <div className='queue-container'>
    {host ?
    <Search
      token={token}
      addToQueue={addToQueue}
    />
    : null}
    <div className='queue-title'>Up Next: </div>
    {queue.length ? <div className='queued-items'>{upNext}</div> : null}
  </div>
  );
}

export default Queue;
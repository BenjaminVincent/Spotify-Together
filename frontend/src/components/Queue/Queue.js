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

const Queue = ({token, host, queue, addToQueue, removeFromQueue}) => {

  const upNext = queue.slice(1).map(track => (
    <QueueItem
      key={track.id}
      track={track}
      removeFromQueue={removeFromQueue}
      host={host}
      isRequest={false}
    />
  ));

  return (
  <div className='queue-container'>
    {host ? 
      <Search
      token={token}
      host={host}
      addToQueue={addToQueue}
      />
    : null}
    <div className='queue-title'>Up Next:</div>
    {queue.length ? <div className='queued-items'>{upNext}</div> : null}
  </div>
  );
}

export default Queue;
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

const Queue = ({token, song, artist, image, queue, setQueue, queueData, setQueueData, removeFromQueue}) => {

  const upNext = queue.slice(1).map(track => (
    <QueueItem
      key={track.id}
      song={track.name}
      artist={track.artists[0].name}
      image={track.album.images[0].url}
      uri={track.uri}
      removeFromQueue={removeFromQueue}
    />
  ));

  return (
  <div className='queue-container'>
    <Search
      token={token}
      setQueue={setQueue}
      // queueData={queueData}
      // setQueueData={setQueueData}
    />
    <div className='queue-title'>Up Next: </div>
    {queue.length ? upNext : null}
  </div>
  );
}

export default Queue;
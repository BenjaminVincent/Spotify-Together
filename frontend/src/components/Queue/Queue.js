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

const Queue = ({token, song, artist, image, queueList, queue, setQueue, queueData, setQueueData,}) => {

  const upNext = queueData.map(track => (
    <QueueItem
      key={track.id}
      song={track.name}
      artist={track.artists[0].name}
      image={track.album.images[0].url}
    />
  ));

  return (
  <div className='queue-container'>
    <Search
      token={token}
      setQueue={setQueue}
      queueData={queueData}
      setQueueData={setQueueData}
    />
    <div className='queue-title'>Up Next: </div>
    {queueData.length ? upNext : null}
  </div>
  );
}

export default Queue;
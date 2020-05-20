import React from 'react';
import QueueItem from './QueueItem';

/*
    Queue is intended to show all the songs that the host has added to the queue.
    Play the next song in the queue.

    functionality:
        - Add
        - Remove
        - Clear

*/

const Queue = ({song, artist, image}) => {

  const queueList = [];
  return (
  <div className='queue-container'>
    <div className='queue-title'>Up Next: </div>
    <div><QueueItem song={song} artist={artist} image={image}/></div>
    <div><QueueItem song={song} artist={artist} image={image}/></div>
    <div><QueueItem song={song} artist={artist} image={image}/></div>
    <div><QueueItem song={song} artist={artist} image={image}/></div>
    <div><QueueItem song={song} artist={artist} image={image}/></div>
    <div><QueueItem song={song} artist={artist} image={image}/></div>

  </div>
  );
}

export default Queue;
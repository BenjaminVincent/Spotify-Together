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

const Queue = ({song, artist, image}) => {

  const queueList = [];
  return (
  // <div className='queue-container'>
  //   <div className='queue-title'>Up Next: </div>
  //   <div><QueueItem song={song} artist={artist} image={image}/></div>
  //   <Search/>
  // </div>

<Search/>
  );
}

export default Queue;
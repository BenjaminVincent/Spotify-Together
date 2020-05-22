import React, { useState } from 'react';
import { getSearch } from '../../helpers/player-helper';
import '../../styles/Search.css';


/*
    Search uses: https://developer.spotify.com/documentation/web-api/reference/search/search/ 
    From the API

    functionality:
        - Type in a song (track) and search spotify database for result


*/

const Search = ({ token, setQueue, queueData, setQueueData }) => {

  // const [q, setQ] = useState('');
  // const [typing, setTyping] = useState(true);
  const [typingTimeout, setTypingTimeout] = useState(0);
  const [searchResults, setSearchResults] = useState('');

  const handleSearch = async (q) => {
    if (q) {
      const data = await getSearch(token, q);
      console.log('search data', data);
      setSearchResults(data);
    }
  }

  const listSongs = () => {
    const songs = searchResults.tracks.items.map(track => (
      <li 
        className='search-results' 
        key={track.id}
        onClick={() => {
        setQueue(track);
        // setQueueData(queueData => [...queueData, track]);
        setSearchResults('');
      }}>
      {track.name} - {track.artists[0].name} 
      </li>
    ));
    return songs
  }

  return (
    <div>  
      <div>Search</div>
      <input 
        className='joinInput' 
        placeholder='Search...' 
        type='text'
        onChange={event => {
          // handleSearch(event.target.value);
          const q = event.target.value;
          clearTimeout(typingTimeout);
          setTypingTimeout(setTimeout(() => handleSearch(q), 800));
        }}
      />
      <ul> {searchResults ? listSongs() : null} </ul>
    </div>

  );
}

export default Search;
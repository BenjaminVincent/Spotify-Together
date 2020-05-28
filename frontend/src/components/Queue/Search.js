import React, { useState } from 'react';
import { getSearch } from '../../helpers/player-helper';
import '../../styles/Search.css';


/*
    Search uses: https://developer.spotify.com/documentation/web-api/reference/search/search/ 
    From the API

    functionality:
        - Type in a song (track) and search spotify database for result
*/

const Search = ({ token, host, addToQueue, sendSongRequest, addToRequestQueue}) => {

  const [typingTimeout, setTypingTimeout] = useState(0);
  const [searchResults, setSearchResults] = useState('');

  const handleSearch = async (q) => {
    if (q) {
      const data = await getSearch(token, q);
      setSearchResults(data);
    }
  }

  const listSongs = () => {
    const songs = searchResults.tracks.items.map(track => (
      <li 
        className='search-results' 
        key={track.id}
        onClick={() => {
          if (host) {
            addToQueue(track)
          } else {
            sendSongRequest(track); //sends song request from listener to host
            addToRequestQueue(track); // adds song to listener's personal requested list
          }
          setSearchResults('');
          document.getElementById('search-input').value = ''
        }}
      >
      {track.name} - {track.artists[0].name} 
      </li>
    ));
    return songs;
  }

  return (
    <div>  
      <input
        id='search-input'
        className='joinInput' 
        placeholder='Search...' 
        type='text'
        onChange={event => {
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
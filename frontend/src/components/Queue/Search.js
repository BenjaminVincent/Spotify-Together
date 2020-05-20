import React from 'react';
import ReactSearchBox from 'react-search-box';

/*
    Search uses: https://developer.spotify.com/documentation/web-api/reference/search/search/ 
    From the API

    functionality:
        - Type in a song (track) and search spotify database for result


*/

const Search = () => {
  const data = [
    {
      key: 'john',
      value: 'John Doe',
    },
    {
      key: 'jane',
      value: 'Jane Doe',
    },
    {
      key: 'mary',
      value: 'Mary Phillips',
    },
    {
      key: 'robert',
      value: 'Robert',
    },
    {
      key: 'karius',
      value: 'Karius',
    },
  ]

  return (
  <div>      
    <ReactSearchBox
    placeholder="Search..."
    data={data}
    callback={record => console.log(record)}
    />
  </div>
  );
}

export default Search;
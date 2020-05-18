import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateID } from '../helpers/player-helper.js';
import { FaAngleLeft } from 'react-icons/fa';
import '../styles/Player.css';
import '../styles/App.css';

const Host = () => {
 
  const [name, setName] = useState('');
  const [room, setRoom] = useState('cat');

  const handleClick = (e) => {
    if (!name) e.preventDefault();
  }

  return (
    <div className='joinOuterContainer'>
      <Link to='/' ><FaAngleLeft color='white' size='2em'/></Link>
      <div className='heading'>Host session</div><br/>
      <div>
        <div>
          <input 
              placeholder='Display name'
              className='joinInput' 
              type='text'
              onKeyPress={event => event.key === 'Enter' && name ? event.preventDefault() : null}  
              onChange={(event) => {
                setName(event.target.value);
                }}
                />
        </div><br/>
        <div>
          <Link
            onClick={(event) => handleClick(event)}
            to={`/sessionhost?name=${name}&room=${room}`}>
            <button 
              className='btn' 
              type='submit'
            >join</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Host;
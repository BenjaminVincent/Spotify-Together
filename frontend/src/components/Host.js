import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { generateID } from '../helpers/player-helper.js';
import '../styles/Player.css';
import '../styles/App.css';
import '../styles/Host.css';



const Host = () => {
 
  const [name, setName] = useState('');
  const [room, setRoom] = useState('cat');

  return (
    <div className='joinOuterContainer'>
      <div className='heading'>Host session</div><br/>
      <div>
        <div>
          <input 
              placeholder='Display Name' 
              className='joinInput' 
              type='text' 
              onChange={(event) => {
                setName(event.target.value);
                }}/></div><br/>
        <div>
          <Link
            onClick={(event) => {if(!name) event.preventDefault()}}
            to={`/sessionhost?name=${name}&room=${room}`}>
            <button 
              className='btn btn--loginApp-link' 
              type='submit' 
            >join</button>
          </Link>
        </div>
      </div>
    </div>
  );
}

export default Host;
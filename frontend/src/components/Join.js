import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { FaAngleLeft } from 'react-icons/fa';
import '../styles/Listener.css';
import { Redirect } from 'react-router-dom';
import ErrorMessage from './ErrorMessage'; 

const Join = () => {

  const [name, setName] = useState('');
  const [room, setRoom] = useState('');
  const [allowed, setAllowed] = useState(false);
  const [errorMessage, setErrorMessage] = useState('');
  const MAXNAMELENGTH = 16;

  const getUsers = async () => {
    // let response = await fetch('https://listen-together-music.herokuapp.com/users');
    let response = await fetch('http://localhost:3000/users');
    let data = await response.json();
    return data;
  }

  const handleClick = async (e) => {
    e.preventDefault();
    let users = await getUsers();
    let roomExists = users.find((user) => user.room === room);
    let userInRoom = users.find((user) => user.room === room && user.name.toLowerCase() === name.toLowerCase());


    if (roomExists) {
      if (userInRoom) {
        setErrorMessage(`User "${name}" already exists in room`);
      } else if (name.length > MAXNAMELENGTH) {
        setErrorMessage('Please enter a shorter name');
      } else {
        setAllowed(true);
      }
    } else {
      setErrorMessage(`Room "${room}" doesn't exist`)
    }
  }

  return (
    <div className='joinOuterContainer'>
      {allowed ? <Redirect to={`/sessionjoin?name=${name}&room=${room}`}/>
      :
      <div>
      <Link to='/' ><FaAngleLeft color='white' size='2em'/></Link>  
      <div className='heading'>Join session</div><br/>
        <ErrorMessage message={errorMessage}/>
        <div>
          <div><input placeholder='Display Name' className='joinInput' type='text' onChange={(event) => setName(event.target.value)}/></div><br/>
          <div><input placeholder='Room ID' className="joinInput" type="text" onChange={(event) => setRoom(event.target.value)}/></div><br/>
          <button className='btn' type='submit' onClick={(event) => handleClick(event)}>join</button>
      </div>
      </div>}
    </div>
  )
}

export default Join;
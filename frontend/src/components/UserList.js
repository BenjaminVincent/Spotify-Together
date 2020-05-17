import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/UserList.css';

const UserList = ({ users }) => {

  var listUsers = users.map(user => (

    <li className='user-image'>
        <FaUserCircle size='1.5em'/>
        <span className='user-name'>{user.name}</span>
    </li>
  ));

  return (
    <div>
      <ul className='user-list'>{listUsers}</ul>
    </div>
  )
}

export default UserList;
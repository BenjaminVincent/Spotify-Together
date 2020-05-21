import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/UserList.css';

const UserList = ({ users }) => {

  let listUsers = users.map(user => (

    <li className='user-image' key={user.id}>
        <FaUserCircle size='1.2em'/>
        <span className='user-name'>{user.name}</span>
    </li>
  ));

  return (
      <ul className='user-list'>{listUsers}</ul>
  )
}

export default UserList;
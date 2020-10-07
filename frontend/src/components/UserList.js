import React from 'react';
import { FaUserCircle } from 'react-icons/fa';
import '../styles/UserList.css';

const truncateText = (text, len) => {
  if (text.length > len) return text.slice(0, len) + '...';
  else return text.slice(0, len);
}

const UserList = ({ users }) => {

  let listUsers = users.map(user => (

    <li className='user-image' key={user.id}>
        <FaUserCircle size='30px'/>
        <span className='user-name'>{truncateText(user.name, 7)}</span>
    </li>
  ));

  return (
      <ul className='user-list'>{listUsers}</ul>
  )
}

export default UserList;
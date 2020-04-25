import React from 'react';

import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';

import '../styles/InfoBar.css';

const InfoBar = ({ room }) => (
  <div>
    <div>
      <img className='onlineIcon' src={onlineIcon} alt='online' />
      <h3>{room}</h3>
    </div>
    <div>
      <a href='/'><img src={closeIcon} alt='close' /></a>
    </div>
  </div>
);

export default InfoBar;
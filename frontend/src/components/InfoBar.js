import React from 'react';
import onlineIcon from '../icons/onlineIcon.png';
import closeIcon from '../icons/closeIcon.png';
import '../styles/InfoBar.css';

const InfoBar = () => (
  <div>
    <div>
      <img className='onlineIcon' src={onlineIcon} alt='online' />
    </div>
    <div>
      <a href='/'><img src={closeIcon} alt='close' /></a>
    </div>
  </div>
);

export default InfoBar;
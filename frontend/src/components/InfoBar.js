import React from 'react';
import onlineIcon from '../icons/onlineIcon.png';
import '../styles/InfoBar.css';

const InfoBar = () => (
  
  <div>
    <div>
      <img className='onlineIcon' src={onlineIcon} alt='online' />
    </div>
  </div>
);

export default InfoBar;
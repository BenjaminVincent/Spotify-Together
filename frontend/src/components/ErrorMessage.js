import React from 'react';
import '../styles/Listener.css';

const ErrorMessage = ({ message }) => {
  return message ? <><div className='joinError'>{message}</div><br/></> : null;
}

export default ErrorMessage;
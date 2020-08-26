import React from 'react';
import '../styles/Input.css';
import { MdSend } from "react-icons/md";

const Input = ({ message, setMessage, sendMessage }) => (
    
    <form className='form'>
        <input
            className='input'
            type='text'
            placeholder='Type a message...'
            value={message}
            onChange={event => setMessage(event.target.value)}
            onKeyPress={event => event.key === 'Enter' ? sendMessage(event) : null}
        />
        <MdSend size="28px" style={{ cursor: 'pointer', fill: '#1ecd97'}} onClick={event => sendMessage(event)} />
    </form>
);

export default Input;
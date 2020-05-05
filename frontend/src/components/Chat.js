import React, { useState, useEffect } from 'react';
import '../styles/Chat.css';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';

const Chat = ({ message, setMessage, messages, sendMessage, name }) => {

    return (
        <div>
            <div>
                <InfoBar/>
                <Messages
                    messages={messages}
                    name={name}
                />
                <Input
                    message={message}
                    setMessage={setMessage}
                    sendMessage={sendMessage}
                />
            </div>
        </div>
    )
};

export default Chat;
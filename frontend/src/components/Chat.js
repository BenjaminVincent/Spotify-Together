import React from 'react';
import '../styles/Chat.css';
import InfoBar from './InfoBar';
import Input from './Input';
import Messages from './Messages';

const Chat = ({ message, setMessage, messages, sendMessage, name }) => {

    return (
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
    )
};

export default Chat;
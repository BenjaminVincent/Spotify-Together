import React, {useState} from 'react';
import {CopyToClipboard} from 'react-copy-to-clipboard';
import { RiFileCopy2Line } from 'react-icons/ri';
import Expire from './Expire';


const RoomInvite = ({ room }) => {
    const [copied, setCopied] = useState(false);
    
    const resetCopied = () => setTimeout(() => setCopied(false), 2000);

    return (
        <div className='room-invite'>
            <CopyToClipboard
                text={room}
                onCopy={() => {
                    setCopied(true)
                    resetCopied()
                }}
            >
            <RiFileCopy2Line/>
            </CopyToClipboard>
            {copied ? <div className='room-copied'><Expire delay={1500}>copied</Expire></div> : null}
        </div>
    )
}

export default RoomInvite;
import React, { useState } from 'react';
import { FaVolumeUp } from "react-icons/fa";
import { Slider } from 'material-ui-slider';
import { updateVolume } from '../helpers/player-helper';

const VolumeControl = ({ token }) => {
    const [vol, setVol] = useState(50);

    return (
        <div className='volume-container'>
            <FaVolumeUp style={{ marginRight: "12px"}} size='32px' />
            <Slider style={{ width: "125px" }} color="#eee" defaultValue={vol} onChangeComplete={(event) => {
                setVol(event);
                updateVolume(token, event);
                }}/>
            {console.log("Volume", vol)}
        </div>
    );
};

export default VolumeControl;
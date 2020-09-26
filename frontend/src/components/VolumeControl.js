import React from 'react';
import { FaVolumeUp } from "react-icons/fa";

import { Slider } from 'material-ui-slider';

const VolumeControl = () => {

    return (
        <div className='volume-container'>
            <FaVolumeUp style={{ marginRight: "12px"}} size='32px' />
            <Slider color="#eee" defaultValue={10} />
        </div>
    );
};

export default VolumeControl;
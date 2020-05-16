import React from 'react';

const HandleError = ({ errorMessage }) => {

    return (
        <div className='joinOuterContainer'>
            <div>{errorMessage}</div><br/>
            <a 
            href='/'>
            <button className='btn' type='submit'>ok</button>
            </a>
        </div>
    );
};

export default HandleError;
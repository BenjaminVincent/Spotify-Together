import React from 'react';

const HandleError = ({ errorMessage }) => {

    return (
        <div>
            <div>{errorMessage}</div>
            <a 
            href='/'>
            <button className='btn' type='submit'>ok</button>
            </a>
        </div>
    );
};

export default HandleError;
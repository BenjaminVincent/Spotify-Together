import React from 'react';

const HandleError = ({ errorMessage }) => {

    return (
        <div>
            <div>{errorMessage}</div>
            <a 
            href='/'>
            <button className='btn bton--loginApp-link' type='submit'>ok</button>
            </a>
        </div>
    );
};

export default HandleError;
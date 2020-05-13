import React from 'react';
import { Link } from 'react-router-dom';

const End = () => {

    return (
        <div>
            <div>The session has been ended by the Host.</div>
            <Link 
            to={`/`}>
            <button className='btn bton--loginApp-link' type='submit'>ok</button>
            </Link>
        </div>
    );
};

export default End;
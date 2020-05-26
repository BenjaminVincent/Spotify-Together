import React from 'react';
import ErrorMessage from './ErrorMessage';
import { Link } from 'react-router-dom';
import '../styles/Home.css';

const Home = () => {

    return (
        <div className='Home-container'>
            <div className='Home-title'>Listen Together</div>
            <div className='Home-button'>
                <Link to='/join' className='btn'>join</Link>
                <Link to='/host' className='btn'>host</Link>
            </div>

        </div>
    )
}

export default Home;
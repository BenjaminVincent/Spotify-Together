import React from 'react';
import {BrowserRouter, Route, Link } from 'react-router-dom';
import Listener from './Listener';
import Host from './Host';

{/* <Link to='/listener' className="btn btn--loginApp-link"></Link> */}

const Home = (props) => {
    return (
        <div>
            Home page <br/> <br/>
            <Link to='/listener' className="btn btn--loginApp-link">Listen</Link>
            <Link to='/host'className="btn btn--loginApp-link">Host</Link>
        </div>
    )
}

export default Home;


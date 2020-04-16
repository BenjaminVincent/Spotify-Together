import React from 'react';
import {BrowserRouter, Route, Link } from 'react-router-dom';
import { authEndpoint, clientId, redirectUri, scopes } from "../helpers/authConfig";
import Listener from './Listener';
import Host from './Host';

{/* <Link to='/listener' className="btn btn--loginApp-link"></Link> */}

const Home = (props) => {
    return (
        <div>
            Home page <br/> <br/>
            <Link to='/listener' className="btn btn--loginApp-link">Listen</Link>
            <a
            className="btn btn--loginApp-link"
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
            "%20"
            )}&response_type=token&show_dialog=true`}
            >
            Host
            </a>
        </div>
    )
}

export default Home;

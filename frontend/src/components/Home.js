import React, { useState } from "react";
import { Link } from 'react-router-dom';

const Home = (props) => {



    return (
        <div>
            Listen Together <br/> <br/>
            <Link to='/join' className="btn btn--loginApp-link">join</Link>
            <Link to='/host' className="btn btn--loginApp-link">host</Link>

        </div>
    )
}

export default Home;

{/* <a
className="btn btn--loginApp-link"
href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
"%20"
)}&response_type=token&show_dialog=true`}
>
Host
</a> */}
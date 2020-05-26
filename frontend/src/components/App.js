import React, { useState, useEffect } from 'react';
import '../styles/App.css';
import Join from './Join';
import Chat from './Chat';
import Home from './Home';
import Host from './Host';
import Session from './Session';
import HandleError from './HandleError';
import ErrorMessage from './ErrorMessage';
import hash from '../helpers/hash';
import {BrowserRouter, Route } from 'react-router-dom';
import { authEndpoint, clientId, redirectUri, scopes } from '../helpers/authConfig';
import { getDevices, filterDevices } from '../helpers/player-helper';


const App = () => {

  const [token, setToken] = useState('');
  const [device, setDevice] = useState('');

  const updateDevice = async (_token) => {
    const res = await getDevices(_token);
    if (res.ok) {
      const data = await res.json();
      const activeDevice = filterDevices(data);
      if (activeDevice.length === 0) {
        setDevice('No Device ID found');
      } else {
        setDevice(activeDevice[0].id);
      }
    } else {
      console.log('getDevices error', res.status);
    }
  };

  useEffect(() => {
    let _token = hash.access_token;
    if (_token) {
      setToken(_token);
      updateDevice(_token)
    }
  }, []);

  return (
    <BrowserRouter>
    <div className='App-base'> 
      {token ?
        device === 'No Device ID found' ?
        <Route exact path='/' 
        component={() => 
          <HandleError errorMessage="No Device found. Please open spotify and make sure it's active."/>}
        /> :
        <div className='App-allowed'>
          <Route exact path='/' component={Home}/>
          <Route exact path='/chat' component={Chat}/>
          <Route exact path='/join' component={Join}/>
          <Route exact path='/host' component={Host}/>
          <Route exact path='/end' 
            component={() => 
          <HandleError errorMessage='The session has been ended by the Host.'/>}
          />
          <Route exact path='/sessionjoin' 
            component={() => 
              <Session token={token}/>}
          />
          <Route exact path='/sessionhost' 
            component={() => 
              <Session token={token}/>}
          />
        </div>
      :
        <div>
          <div className='App-auth'>
          <ErrorMessage message={'This application is in development. Expect bugs, unfinished functionality and visual glitches.'}/>
            <ul className='App-preface'>To use Listen Together you must: <br/>
              <div className='auth-bullets'>
                <li>have spotify open</li>
                <li>authenticate and agree</li>
              </div>
            </ul>
            <a 
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>
              <button className='btn' type='submit'>authenticate</button>
            </a>
          </div>
        </div>
      }
    </div>
    </BrowserRouter>
  );
};

export default App;
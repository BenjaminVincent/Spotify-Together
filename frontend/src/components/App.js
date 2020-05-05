import React, { Component } from 'react';
import '../styles/App.css';
import Join from './Join';
import Chat from './Chat';
import Home from './Home';
import Host from './Host';
import Session from './Session';
import hash from '../helpers/hash';
import {BrowserRouter, Route } from 'react-router-dom';
import { authEndpoint, clientId, redirectUri, scopes } from '../helpers/authConfig';


class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: null,
    };
  }

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
    }
  }

  render() {
    return (
      <BrowserRouter>
      
      <div className='App-base'> 
          {this.state.token ?
            <div>
              <Route exact path='/' component={Home}/>
              <Route exact path='/chat' component={Chat}/>
              <Route exact path='/join' component={Join}/>
              <Route exact path='/host' component={Host}/>
              <Route exact path='/sessionjoin' 
                component={() => 
                  <Session token={this.state.token}/>}
              />
              <Route exact path='/sessionhost' 
                component={() => 
                  <Session token={this.state.token}/>}
              />
              
            </div>
        :
        <div>
        <div className='App-auth'>
          <ul className='App-preface'>To use Listen Together you must: <br/>
            <li>have spotify open</li>
            <li>authenticate and agree</li>
          </ul>
          <a 
            href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join("%20")}&response_type=token&show_dialog=true`}>
             <button className='btn bton--loginApp-link' type='submit'>
              authenticate
              </button>
          </a>
        </div>
        </div>
        }
      </div>
      </BrowserRouter>
    );
  }
}

export default App;
import React, { Component } from 'react';
import '../styles/App.css';
import Join from './Join';
import Chat from './Chat';
import Home from './Home';
import Host from './Host';
import hash from '../helpers/hash';
import {BrowserRouter, Route } from 'react-router-dom';
import { authEndpoint, clientId, redirectUri, scopes } from '../helpers/authConfig';



/*
  Goal: remove api calls and state that rely on constant updating and move to appropriate component


  What can stay?
    State: token,


*/

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


  // callAPI() {
  //   fetch('http://localhost:8080/testAPI')
  //     .then(res => res.text())
  //     .then(res => this.setState({
  //       apiResponse: res,
  //     }))
  //     .catch(err => err);
  // }

//   componentWillMount() {
//     this.callAPI();
// }


  render() {
    return (
      <BrowserRouter>
      
      <div className='App-base'> 

          {this.state.token ?
            <div>
              <Route exact path='/' component={Home}/>
              <Route exact path='/chat' component={Chat}/>
              <Route exact path='/join' component={Join}/>
              <Route 
                exact path='/host' 
                component={() => 
                  <Host token={this.state.token}/>}
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

// item: {
//   album: {
//     images: [{ url: '' }]
//   },
//   name: '',
//   artists: [{ name: '' }],
//   duration_ms:0,
// },
// is_playing: false,
// progress_ms: 0,
// deviceId: '',
// apiResponse: '',
// created: false,
// room: this.generateID(),
// };
// this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);

//  filterDevices = (devices) => devices.devices.filter(device => device.is_active);
  
// getDevices(token) {
//   $.ajax({
//     url: 'https://api.spotify.com/v1/me/player/devices',
//     type: 'GET',
//     beforeSend: xhr => {
//       xhr.setRequestHeader('Authorization', 'Bearer ' + token);
//     },
//     success: (data) => {
//       const activeDevice = this.filterDevices(data);
//       this.setState({
//         deviceId: activeDevice[0].id,
//       });
//     },
//   });
// }

// setCreatedRoom = () => this.setState({ created: !this.state.created });

// generateID = () => Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);

// setHostName = (name) => this.setState({ name: name });


// getCurrentlyPlaying(token) {
//   $.ajax({
//     url: 'https://api.spotify.com/v1/me/player/currently-playing',
//     type: 'GET',
//     beforeSend: xhr => {
//       xhr.setRequestHeader('Authorization', 'Bearer ' + token);
//     },
//     success: (data) => {
//       this.setState({
//         item: data.item,
//         progress_ms: data.progress_ms,
//         is_playing: data.is_playing,
//         position_ms: data.progress_ms,
//       });
//     },
//   });
// }

// handlePausePlay = () => {
//   this.state.is_playing ? this.pauseCurrent(this.state.token) : this.playCurrent(this.state.token);
// }

// pauseCurrent(token) {
//   $.ajax({
//     url: `https://api.spotify.com/v1/me/player/pause?device_id=${this.state.deviceId}`,
//     type: 'PUT',
//     beforeSend: xhr => {
//       xhr.setRequestHeader('Authorization', 'Bearer ' + token);
//       this.getCurrentlyPlaying(this.state.token);
//     },
//     success: () => {
//       this.setState({
//         is_playing: false,
//       });
//     }
//   });
// }

// playCurrent(token) {
//   $.ajax({
//     url: `https://api.spotify.com/v1/me/player/play?device_id=${this.state.deviceId}`,
//     type: 'PUT',
//     beforeSend: xhr => {
//       xhr.setRequestHeader('Authorization', 'Bearer ' + token);
//       this.getCurrentlyPlaying(this.state.token);
//     },
//     data: JSON.stringify(
//       {
//         'uris': [this.state.item.uri],
//         'position_ms': this.state.progress_ms,
//       }
//     ),
//     success: () => {
//       this.setState({
//         is_playing: true,
//       });
//     }
//   });
// }

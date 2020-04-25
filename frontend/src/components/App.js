import React, { Component } from 'react';
import * as $ from "jquery";
import '../styles/App.css';
import Listener from './Listener';
import Home from './Home';
import Host from './Host';
import hash from '../helpers/hash';
import {BrowserRouter, Route, Link } from 'react-router-dom'; 



class App extends Component {

  constructor(props) {
    super(props);
    this.state = {
      token: null,
    item: {
      album: {
        images: [{ url: "" }]
      },
      name: "",
      artists: [{ name: "" }],
      duration_ms:0,
    },
    is_playing: false,
    progress_ms: 0,
    deviceId: "",
    apiResponse: "",
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  };

  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
      this.getDevices(_token);
      this.getCurrentlyPlaying(_token);
    }
    this.callAPI();
  }

  filterDevices = (devices) => devices.devices.filter(device => device.is_active);
  
  callAPI() {
    fetch('http://localhost:8080/testAPI')
      .then(res => res.text())
      .then(res => this.setState({
        apiResponse: res,
      }))
      .catch(err => err);
  }

//   componentWillMount() {
//     this.callAPI();
// }

  getDevices(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/player/devices",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        const activeDevice = this.filterDevices(data);
        this.setState({
          deviceId: activeDevice[0].id,
        });
      },
    });
  }


  getCurrentlyPlaying(token) {
    $.ajax({
      url: "https://api.spotify.com/v1/me/player/currently-playing",
      type: "GET",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
      },
      success: (data) => {
        this.setState({
          item: data.item,
          progress_ms: data.progress_ms,
          is_playing: data.is_playing,
          position_ms: data.progress_ms,
        });
      },
    });
  }

  handlePausePlay = () => {
    this.state.is_playing ? this.pauseCurrent(this.state.token) : this.playCurrent(this.state.token);
  }

  pauseCurrent(token) {
    $.ajax({
      url: `https://api.spotify.com/v1/me/player/pause?device_id=${this.state.deviceId}`,
      type: "PUT",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        this.getCurrentlyPlaying(this.state.token);
      },
      success: () => {
        this.setState({
          is_playing: false,
        });
      }
    });
  }

  playCurrent(token) {
    $.ajax({
      url: `https://api.spotify.com/v1/me/player/play?device_id=${this.state.deviceId}`,
      type: "PUT",
      beforeSend: xhr => {
        xhr.setRequestHeader("Authorization", "Bearer " + token);
        this.getCurrentlyPlaying(this.state.token);
      },
      data: JSON.stringify(
        {
          "uris": [this.state.item.uri],
          "position_ms": this.state.progress_ms,
        }
      ),
      success: () => {
        this.setState({
          is_playing: true,
        });
      }
    });
  }


  render() {
    return (
      <BrowserRouter>
      <div className="App">
      
        <header className="App-header">
          {/* {this.state.apiResponse} */}
          <div>
            <Route exact path='/' component={Home}/>
            <Route exact path='/listener' component={Listener}/>
            <Route exact path='/host' component={Host}/>
          </div>
          {this.state.token && (
            <div>
            <Host
            item={this.state.item ? this.state.item : ""}
            is_playing={this.state.is_playing}
            position_ms={this.state.progress_ms}
            deviceId={this.state.deviceId}
            />              
            <button type="button" className="btn btn--pause-play"
              is_playing={this.state.is_playing}
              onClick={this.handlePausePlay}
            >
              {this.state.is_playing ? "Pause" : "Play"}
            </button>
          </div>
          )}
        </header>
      </div>
      </BrowserRouter>
    );
  }
}
export default App;
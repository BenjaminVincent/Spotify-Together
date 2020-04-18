import React, { Component } from 'react';
import * as $ from "jquery";
import Peer from 'peerjs';
import '../styles/App.css';
import Listener from './Listener';
import Home from './Home';
import Host from './Host';
import hash from '../helpers/hash';
import {BrowserRouter, Route, Link } from 'react-router-dom'; 



class App extends Component {

  constructor() {
    super();
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
    sessionIdHost: null,
    sessionIdListener: null,
    };
    this.getCurrentlyPlaying = this.getCurrentlyPlaying.bind(this);
  };


  componentWillMount() {
    var lastPeerId = null;
    var peer = null; // Own peer object
    var peerId = null;
    var conn = null;  
    peer = new Peer(null, {
      debug: 2
  });

  peer.on('open', function (id) {
      // Workaround for peer.reconnect deleting previous id
      if (peer.id === null) {
          console.log('Received null id from peer open');
          peer.id = lastPeerId;
      } else {
          lastPeerId = peer.id;
      }

      console.log('ID: ' + peer.id);
  });
  }


  componentDidMount() {
    let _token = hash.access_token;
    if (_token) {
      this.setState({
        token: _token
      });
      this.getDevices(_token);
      this.getCurrentlyPlaying(_token);
    }
    // let lastPeerId = null;
    // let peerHost = null;
    // let connHost = null;
    // let peerListener = null;
    // let connListener = null;


    
    // peerListener.on('open', (id) => {
    //   console.log('ID: ' + id);
    //   console.log("peerListener Obj:", peerListener);
    //   this.setState({
    //     sessionIdListener: id,
    //   });
    // });
    //   // This should be done in respective component
    //   peer.on('connection', function (c) {
    //     conn = c;
    //     console.log("Connected to: " + conn.peer);
    // });
  }

  filterDevices = (devices) => devices.devices.filter(device => device.is_active);
  


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
            sessionIdHost={this.state.sessionIdHost ? this.state.sessionIdHost : "generating"}
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
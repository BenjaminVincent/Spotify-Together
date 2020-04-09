import React, { Component } from 'react';
import * as $ from "jquery";
import './styles/App.css';
import Player from './components/Player';
import hash from './hash';
import { authEndpoint, clientId, deviceId, redirectUri, scopes } from "./authConfig";

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
        console.log("devices", data);
        const activeDevice = this.filterDevices(data);
        console.log("activeDevice:", activeDevice[0].id);
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
      <div className="App">
        <header className="App-header">
          {!this.state.token && (
            <a
              className="btn btn--loginApp-link"
              href={`${authEndpoint}?client_id=${clientId}&redirect_uri=${redirectUri}&scope=${scopes.join(
                "%20"
              )}&response_type=token&show_dialog=true`}
            >
              Login to Spotify
            </a>
          )}
          {this.state.token && (
            <div>
            <Player
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
    );
  }
}
export default App;
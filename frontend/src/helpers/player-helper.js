export const filterDevices = (devices) => devices.devices.filter(device => device.is_active);


export const getDevices = (token) => {
    fetch('https://api.spotify.com/v1/me/player/devices', {
      method: 'GET', headers: {
          'Accept': 'application/json',
          'Content-Type': 'application/json',
          'Authorization': 'Bearer ' + token
      }
    })
      .then(res => res.json())
      .then(data => console.log('data', data))
      .catch(err => err);
  }


// export const getDevices = (token) => {
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

// export const setCreatedRoom = () => this.setState({ created: !this.state.created });

export const generateID = () => Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
export const setHostName = (name) => this.setState({ name: name });


// export const getCurrentlyPlaying = (token) => {
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

// export const handlePausePlay = () => {
//   this.state.is_playing ? this.pauseCurrent(this.state.token) : this.playCurrent(this.state.token);
// }

// export const pauseCurrent = (token) => {
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

// export const playCurrent = (token) => {
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
// 
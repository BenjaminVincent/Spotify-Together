export const filterDevices = (devices) => devices.devices.filter(device => device.is_active);
export const generateID = () => Math.floor((1 + Math.random()) * 1e16).toString(16).substring(1);
export const setHostName = (name) => this.setState({ name: name });

export const getCurrentlyPlaying = async (token) => {
  const res = await fetch('https://api.spotify.com/v1/me/player/currently-playing', {
    method: 'GET', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      }
  }).catch((error) => {
    return error;
  });
  const data = await res.json();
  return data;
}

export const playCurrent = async (token, songData) => {
  const res = await fetch('https://api.spotify.com/v1/me/player/play', {
    method: 'PUT', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    },
    body: JSON.stringify(
      {
        'uris': [songData.current.item.uri, 'spotify:track:0gjH2qn0la5lyXsWsJpmnx'],
        'position_ms': songData.current.progress_ms,
      }
    ),
  }).catch((error) => {
    return error;
  });

  return res;
}

export const pauseCurrent = async (token) => {
  const res = await fetch('https://api.spotify.com/v1/me/player/pause', {
    method: 'PUT', 
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
    }
  }).catch((error) => {
    return error;
  });

  return res;
}

export const getUserInfo = async (token) => {
  const res = await fetch('https://api.spotify.com/v1/me', {
    method: 'GET',
    headers: {
      'Accept': 'application/json',
      'Content-Type': 'application/json',
      'Authorization': 'Bearer ' + token,
      }
  }).catch((error) => {
    return error;
  });
  return res;
}
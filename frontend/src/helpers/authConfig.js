export const authEndpoint = 'https://accounts.spotify.com/authorize';
// Replace with your app's client ID, redirect URI and desired scopes
export const clientId = '5c2e565bf4f448e395b0062ec854dd1b';
export const redirectUri = 'http://localhost:3000/';
export const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
];

// 'https://listen-together-music.herokuapp.com/'
// 'http://5eb1fb2f4e503485ed7d44cd--listen-together.netlify.app/'
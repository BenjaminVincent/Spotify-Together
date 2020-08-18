export const auth = 'https://accounts.spotify.com/authorize';
export const clientId = '5c2e565bf4f448e395b0062ec854dd1b';

/* NETLIFY */
// export const redirectUri = 'https://listen-together.netlify.app';

/* LOCAL */
export const redirectUri = 'http://localhost:3000/';

export const scopes = [
  'user-read-currently-playing',
  'user-read-playback-state',
  'user-modify-playback-state',
  'user-read-email',
  'user-read-private',
];

// 'https://listen-together-music.herokuapp.com/'
// 'http://5eb1fb2f4e503485ed7d44cd--listen-together.netlify.app/'
// 'http://localhost:3000/'
// 'https://listen-together.netlify.app'
const express = require('express');
const cors = require('cors');
const session = require('express-session');
const passport = require('passport');
const SpotifyStrategy = require('passport-spotify').Strategy;
const axios = require('axios');
require('dotenv').config();

const app = express();
app.use(cors());
app.use(express.json());

const PORT = process.env.PORT || 3001;

// Session middleware
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: true,
  saveUninitialized: true
}));

app.use(passport.initialize());
app.use(passport.session());

// User data
const users = [];

passport.use(
  new SpotifyStrategy(
    {
      clientID: process.env.SPOTIFY_CLIENT,
      clientSecret: process.env.SPOTIFY_CLIENT_SECRET,
      callbackURL: 'http://localhost:3001/api/auth/spotify/callback'
    },
    (accessToken, refreshToken, expires_in, profile, done) => {
      const user = { spotifyId: profile.id, accessToken};
      users.push(user);
      return done(null, user);
    }
  )
);

passport.serializeUser((user, done) => {
  done(null, user);
});

passport.deserializeUser((user, done) => {
  done(null, user);
});

// Authentication routes
app.get('/api/auth/spotify', passport.authenticate('spotify', {
  scope: ['playlist-modify-public', 'playlist-modify-private'],
  showDialog: true
}));

app.get('/api/auth/spotify/callback', passport.authenticate('spotify', {
  failureRedirect: '/',
  successRedirect: '/'
}));

// test protected route
app.get('/api/user', (req, res) => {
  if (req.isAuthenticated()) {
    res.json(req.user);
  } else {
    res.status(401).json({ message: 'Unauthorized' });
  }
});

app.get('/', (req, res) => {
  res.send('Server is running');
});

// api endpoints
app.get('/api/search-movies', async (req, res) => {
  const { query } = req.query;

  if (!query) {
    return res.status(400).json({ message: 'Missing search query' });
  }

  try {
    const omdbResponse = await axios.get(`http://www.omdbapi.com/?s=${query}&apikey=${process.env.OMDB_API_KEY}`);
    const movies = omdbResponse.data.Search || [];

    res.json(movies);
  } catch (error) {
    console.error('Error searching movies:', error);
    res.status(500).json({ message: 'Failed to search movies' });
  }
});

app.get('/api/get-soundtrack/:id', async (req, res) => {
  const { id, title } = req.params;
  if (!id || !title) {
    return res.status(400).json({ message: 'Missing required movie ID or title' });
  }

  try {
    const soundtrack = await fetchSoundtrackById(id, title);

    res.json({ soundtrack });
  } catch (error) {
    console.error(`Error fetching soundtrack for movie ID ${id, title}:`, error);
    res.status(500).json({ message: 'Failed to fetch soundtrack' });
  }
});

// still working on implementing this....
async function fetchSoundtrackById(id, movieTitle) {
  try {
    const response = await axios.get('http://ws.audioscrobbler.com/2.0/', {
      params: {
        method: 'track.search',
        track: movieTitle,
        api_key: process.env.LASTFM_API_KEY,
        format: 'json',
      },
    });

    const tracks = response.data.results.trackmatches.track;

    return tracks.map(track => track.name); 
  } catch (error) {
    console.error('Error fetching soundtrack:', error);
    throw error;
  }
}

app.post('/api/create-playlist', async (req, res) => {
  const { songs } = req.body;

  if (!songs || !Array.isArray(songs) || songs.length === 0) {
    return res.status(400).json({ message: 'Invalid or empty songs array' });
  }

  try {
    const accessToken = req.user.accessToken
    const userId = req.user.spotifyId;

    const createPlaylistResponse = await axios.post(
      `https://api.spotify.com/v1/users/${userId}/playlists`,
      {
        name: 'Movie Soundtrack Playlist',
        public: false
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const playlistId = createPlaylistResponse.data.id;

    // Add tracks
    const addTracksResponse = await axios.post(
      `https://api.spotify.com/v1/playlists/${playlistId}/tracks`,
      {
        uris: songs
      },
      {
        headers: {
          Authorization: `Bearer ${accessToken}`,
          'Content-Type': 'application/json'
        }
      }
    );

    const playlistLink = createPlaylistResponse.data.external_urls.spotify;
    res.json({ playlistLink });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ message: 'Failed to create playlist' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
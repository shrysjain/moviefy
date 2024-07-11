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

let spotifyAccessToken = null;

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
  const { id } = req.params;
  if (!id) {
    return res.status(400).json({ message: 'Missing required movie ID' });
  }

  try {
    const soundtrack = await fetchSoundtrackById(id);

    res.json({ soundtrack });
  } catch (error) {
    console.error(`Error fetching soundtrack for movie ID ${id}:`, error);
    res.status(500).json({ message: 'Failed to fetch soundtrack' });
  }
});

async function fetchSoundtrackById(movieId) {
  return ['Song1', 'Song2']

  try {
    const creditsResponse = await axios.get(`https://api.themoviedb.org/3/movie/${movieId}/credits?api_key=${process.env.TMDB_API_KEY}`);

    const musicCrew = creditsResponse.data.crew.filter(member =>
      member.department === 'Sound' || member.job.toLowerCase().includes('music')
    );

    const soundtrack = musicCrew.reduce((songs, member) => {
      const songMatch = member.job.match(/["'](.+?)["']/);
      if (songMatch) {
        songs.push(songMatch[1]);
      }
      return songs;
    }, []);

    return soundtrack;
  } catch (error) {
    console.error('Error fetching soundtrack:', error);
    return [];
  }
}

app.post('/api/create-playlist', async (req, res) => {
  const { movie, soundtrack } = req.body;

  if (!spotifyAccessToken) {
    return res.status(401).json({ error: 'User not authenticated' });
  }

  try {
    const omdbResponse = await axios.get(`http://www.omdbapi.com/?i=${movie.imdbID}&apikey=${OMDB_API_KEY}`);
    const moviePoster = omdbResponse.data.Poster;

    const userResponse = await axios.get('https://api.spotify.com/v1/me', {
      headers: {
        'Authorization': `Bearer ${spotifyAccessToken}`,
      },
    });

    const userId = userResponse.data.id;
    const playlistResponse = await axios.post(`https://api.spotify.com/v1/users/${userId}/playlists`, {
      name: `${movie.Title} Soundtrack`,
      description: 'Generated with Moviefy',
      public: true,
    }, {
      headers: {
        'Authorization': `Bearer ${spotifyAccessToken}`,
      },
    });

    const playlistId = playlistResponse.data.id;

    const trackUris = soundtrack.map(track => `spotify:track:${track.id}`);
    await axios.post(`https://api.spotify.com/v1/playlists/${playlistId}/tracks`, {
      uris: trackUris,
    }, {
      headers: {
        'Authorization': `Bearer ${spotifyAccessToken}`,
      },
    });

    res.json({
      name: `${movie.Title} Soundtrack`,
      description: 'Generated with Moviefy',
      coverArt: moviePoster,
      link: `https://open.spotify.com/playlist/${playlistId}`,
    });
  } catch (error) {
    console.error('Error creating playlist:', error);
    res.status(500).json({ error: 'Failed to create playlist' });
  }
});

app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal Server Error' });
});

app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import SoundtrackList from '../components/SoundtrackList';
import CreatePlaylistButton from '../components/CreatePlaylistButton';
import PlaylistLinkDisplay from '../components/PlaylistLinkDisplay';

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [soundtrack, setSoundtrack] = useState<string[]>([]);
  const [playlistLink, setPlaylistLink] = useState<string>('');

  const handleSearch = async () => {
    try {
      const response = await axiosInstance.get(`/api/search-movies?query=${query}`);
      setMovies(response.data);
    } catch (error) {
      console.error('Error searching movies:', error);
    }
  };

  const handleGetSoundtrack = async (movieId: string) => {
    try {
      const response = await axiosInstance.get(`/api/get-soundtrack/${movieId}`);
      setSelectedMovie(movieId);
      setSoundtrack(response.data.soundtrack);
    } catch (error) {
      console.error('Error getting soundtrack:', error);
    }
  };

  const handleCreatePlaylist = async () => {
    try {
      const response = await axiosInstance.post('/api/create-playlist', { songs: soundtrack });
      setPlaylistLink(response.data.playlistLink);
    } catch (error) {
      console.error('Error creating playlist:', error);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Moviefy</h1>

      {/* Movie Search */}
      <SearchBar
        query={query}
        onChange={setQuery}
        onSearch={handleSearch}
      />

      {/* Search Results */}
      <SearchResults
        movies={movies}
        onSelectMovie={handleGetSoundtrack}
        selectedMovie={selectedMovie}
      />

      {/* Soundtrack Display */}
      {selectedMovie && (
        <SoundtrackList
          soundtrack={soundtrack}
        />
      )}

      {/* Create Playlist Button */}
      {soundtrack.length > 0 && (
        <CreatePlaylistButton
          onCreatePlaylist={handleCreatePlaylist}
        />
      )}

      {/* Playlist Link Display */}
      {playlistLink && (
        <PlaylistLinkDisplay
          playlistLink={playlistLink}
        />
      )}
    </div>
  );
};

export default Home;

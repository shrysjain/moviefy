import React, { useState } from 'react';
import axios from 'axios';
import SearchBar from '../components/SearchBar';
import SearchResults from '../components/SearchResults';
import SoundtrackList from '../components/SoundtrackList';
import CreatePlaylistButton from '../components/CreatePlaylistButton';
import LoadingScreen from '../components/LoadingScreen';
import PlaylistModal from '../components/PlaylistModal';

interface Movie {
  imdbID: string;
  Title: string;
  [key: string]: any;
}

interface PlaylistInfo {
  name: string;
  description: string;
  coverArt: string;
  link: string;
}

const axiosInstance = axios.create({
  baseURL: 'http://localhost:3001',
});

const Home: React.FC = () => {
  const [query, setQuery] = useState('');
  const [movies, setMovies] = useState([]);
  const [selectedMovie, setSelectedMovie] = useState<string | null>(null);
  const [soundtrack, setSoundtrack] = useState<string[]>([]);
  const [playlistLink, setPlaylistLink] = useState<string>('');
  const [loading, setLoading] = useState(false);
  const [playlistInfo, setPlaylistInfo] = useState(null);
  const [showModal, setShowModal] = useState(false);

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
      setLoading(true);
      const response = await axiosInstance.post(`/api/create-playlist`, { movie: selectedMovie, soundtrack });
      setPlaylistInfo(response.data);
      setLoading(false);
      setShowModal(true);
    } catch (error) {
      console.error('Error creating playlist:', error);
      setLoading(false);
    }
  };

  return (
    <div className="container mx-auto py-8">
      <h1 className="text-3xl font-semibold text-center mb-8">Moviefy</h1>

      <SearchBar
        query={query}
        onChange={setQuery}
        onSearch={handleSearch}
      />

      <SearchResults
        movies={movies}
        onSelectMovie={handleGetSoundtrack}
        selectedMovie={selectedMovie}
      />

      {selectedMovie && (
        <SoundtrackList
          soundtrack={soundtrack}
        />
      )}

      {soundtrack.length > 0 && (
        <CreatePlaylistButton
          onCreatePlaylist={handleCreatePlaylist}
        />
      )}

      {loading && <LoadingScreen />}

      {showModal && playlistInfo && <PlaylistModal playlistInfo={playlistInfo} onClose={() => setShowModal(false)} />}
    </div>
  );
};

export default Home;

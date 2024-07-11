import React from 'react';

interface Movie {
  imdbID: string;
  Title: string;
  Year: string;
}

interface SearchResultsProps {
  movies: Movie[];
  onSelectMovie: (imdbID: string) => void;
  selectedMovie: string | null;
}

const SearchResults: React.FC<SearchResultsProps> = ({ movies, onSelectMovie, selectedMovie }) => {
  return (
    <div className="grid grid-cols-3 gap-4">
      {movies.map((movie) => (
        <div
          key={movie.imdbID}
          className={`border border-gray-300 p-4 cursor-pointer ${selectedMovie === movie.imdbID ? 'bg-gray-200' : ''}`}
          onClick={() => onSelectMovie(movie.imdbID)}
        >
          <p className="text-lg font-semibold">{movie.Title}</p>
          <p className="text-sm text-gray-600">{movie.Year}</p>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;

import React from 'react';

interface Movie {
  id: string;
  title: string;
  posterUrl: string;
}

interface SearchResultsProps {
  results: Movie[];
  onSelectMovie: (id: string) => void;
}

const SearchResults: React.FC<SearchResultsProps> = ({ results, onSelectMovie }) => {
  return (
    <div className='grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-4'>
      {results.map((movie) => (
        <div key={movie.id} className="border border-gray-200 rounded-md overflow-hidden">
          <img src={movie.posterUrl} alt={movie.title} className="w-full h-56 object-cover" />
          <div className="p-4">
            <h3 className="text-lg font-bold">{movie.title}</h3>
            <button
              onClick={() => onSelectMovie(movie.id)}
              className="mt-2 bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600"
            >
              Select Movie
            </button>
          </div>
        </div>
      ))}
    </div>
  );
};

export default SearchResults;
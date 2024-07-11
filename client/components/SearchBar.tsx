import React, { useState } from 'react';

const SearchBar: React.FC<{ onSearch: (query: string) => void }> = ({ onSearch }) => {
  const [query, setQuery] = useState('');

  const handleSearch = () => {
    onSearch(query.trim());
  };

  return (
    <div className='flex items-center space-x-2'>
      <input
        type='text'
        placeholder='Search for a movie...'
        value={query}
        onChange={(e) => setQuery(e.target.value)}
        className='border-2 border-gray-300 px-4 py-2 rounded-md focus:outline-none focus:border-blue-500'
      />
      <button
        onClick={handleSearch}
        className='bg-blue-500 text-white px-4 py-2 rounded-md hover:bg-blue-600 focus:outline-none focus:bg-blue-600'
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;
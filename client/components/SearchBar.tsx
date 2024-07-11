import React from 'react';

interface SearchBarProps {
  query: string;
  onChange: (query: string) => void;
  onSearch: () => void;
}

const SearchBar: React.FC<SearchBarProps> = ({ query, onChange, onSearch }) => {
  return (
    <div className="flex items-center justify-center mb-4">
      <input
        type="text"
        className="border border-gray-300 px-4 py-2 rounded-l-md w-96 focus:outline-none"
        placeholder="Search for a movie..."
        value={query}
        onChange={(e) => onChange(e.target.value)}
      />
      <button
        className="bg-blue-500 text-white px-4 py-2 rounded-r-md hover:bg-blue-600 focus:outline-none"
        onClick={onSearch}
      >
        Search
      </button>
    </div>
  );
};

export default SearchBar;

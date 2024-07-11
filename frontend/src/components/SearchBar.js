import React, { useState } from 'react';

function SearchBar({ type ,onSearch }) {
  const [query, setQuery] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };

  return (
    <form onSubmit={handleSubmit} className="mb-6">
      <div className="flex">
        <input
          type="text"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder={type === "text" ? "Search events..." : "Search locations..."}
          className="flex-grow rounded-l-md border-gray-300 shadow-sm focus:border-mongodb-green focus:ring focus:ring-mongodb-green focus:ring-opacity-50"
        />
        <button 
          type="submit" 
          className="bg-mongodb-green hover:bg-mongodb-dark-green text-white font-bold py-2 px-4 rounded-r-md"
        >
          Search
        </button>
      </div>
    </form>
  );
}

export default SearchBar;
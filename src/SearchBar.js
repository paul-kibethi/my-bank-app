import React, { useState } from 'react';
import './App.css'; 

function SearchBar({ transactions, setFilteredTransactions }) {
  const [searchText, setSearchText] = useState('');

  const handleSearch = (event) => {
    const searchTerm = event.target.value.toLowerCase();

    const filteredTransactions = transactions.filter((transaction) =>
      transaction.description.toLowerCase().includes(searchTerm)
    );

    setFilteredTransactions(filteredTransactions);

    setSearchText(searchTerm);
  };

  return (
    <div className="search-container">
      <label htmlFor="search">Search:</label>
      <input
        type="text"
        id="search"
        name="search"
        value={searchText}
        onChange={handleSearch}
        className="search-input" 
        placeholder="Search by description"
      />
    </div>
  );
}

export default SearchBar;

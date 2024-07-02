import React, { useState } from 'react';
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate } from 'react-router-dom';

function SearchBarHome({ searchTerm, setSearchTerm }) {
  const navigate = useNavigate();

  const handleSearchClick = () => {
    navigate('/Restaurant'); 
  };

  return (
    <div className='search'>
      <div className='searchInputs'>
        <input 
          type='text'
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
          placeholder="Introduce una búsqueda"
        />
        <a onClick={handleSearchClick} className='searchIcon'>
          <SearchIcon />
        </a>
      </div>
    </div>
  );
}

export default SearchBarHome;

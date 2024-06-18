import React from 'react';
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';

function SearchBarHome({ searchTerm, setSearchTerm }) {
  return (
    <div className='search'>
        <div className='searchInputs'>
            <input 
                type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Introduce una búsqueda"
            />
            <a href="/Restaurant" className='searchIcon'>
                <SearchIcon />
            </a>
        </div>
    </div>
  );
}

export default SearchBarHome;

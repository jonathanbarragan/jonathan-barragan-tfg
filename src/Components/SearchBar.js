import React, {useState} from 'react'
import "./SearchBar.css";
import SearchIcon from '@mui/icons-material/Search';
function SearchBar({searchTerm, setSearchTerm, handleSearchClick}) {

  return (
    <div className='search'>
        <div className='searchInputs'>
            <input type='text'
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                placeholder="Introduce una búsqueda"/>
            <div onClick={handleSearchClick} className='searchIcon'><SearchIcon /> </div>
        </div>
    </div>
  )
}

export default SearchBar

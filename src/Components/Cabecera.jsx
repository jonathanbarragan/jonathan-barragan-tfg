import React, { useState } from "react";
import "./Cabecera.css";
import { Image } from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';
import { useNavigate, Link } from 'react-router-dom';

export const Cabecera = ({ searchTerm, setSearchTerm, initialShowResults }) => {
    const [showSearchResults, setShowSearchResults] = useState(initialShowResults);
    const navigate = useNavigate();

    const handleSearchClick = () => {
        setShowSearchResults(true);
        navigate('/Restaurant'); // Redirige a la página de resultados
    };

    return (
        <div className="header-container">
            <Link to="/"> 
                <img className="logo-web" src="/Assets/PNG/logo.png" />
            </Link >
            <div className='search-bar'>
                <input
                    type='text'
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    placeholder="Introduce una búsqueda"
                />
                <div onClick={handleSearchClick} className='search-bar-Icon'>
                    <SearchIcon />
                </div>
            </div>
            <Link to="/Cart">
                <Image className="cart" src="/Assets/PNG/cart.png" />
            </Link>
            <Link to="/Profile">
                <Image className="profile" src="/Assets/PNG/profile.png" />
            </Link>
        </div>
    );
};

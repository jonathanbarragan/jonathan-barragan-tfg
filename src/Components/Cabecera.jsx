import React, { useState } from "react";
import "./Cabecera.css";
import { Image } from "react-bootstrap";
import SearchIcon from '@mui/icons-material/Search';

export const Cabecera = ({ initialsearchTerm, initialShowResults, onReturnHomeCLick, onCartClick }) => {
    const [searchTerm, setSearchTerm] = useState(initialsearchTerm);
    const [showSearchResults, setShowSearchResults] = useState(initialShowResults);

    const handleSearchClick = () => {
        // Cambiar el estado para mostrar el componente Login
        setShowSearchResults(true);
    };

    return (
        <div className="header-container">
            <a href="/"> 
                <img className="logo-web" src="/Assets/PNG/logo.png" />
            </a>
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
            {/* Manejador de eventos onClick agregado al icono del carrito */}
            <a href="/Cart">
                <Image href="/Cart" className="cart" src="/Assets/PNG/cart.png" />
            </a>
            <a href="/Profile">
                <Image className="profile" src="/Assets/PNG/profile.png" />
            </a>
        </div>
    );
};

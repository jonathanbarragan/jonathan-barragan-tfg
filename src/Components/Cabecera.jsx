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
            <Image onClick={onReturnHomeCLick} className="logo-web" src="./Assets/PNG/logo.png" />
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
            <Image onClick={onCartClick} className="cart" src="./Assets/PNG/cart.png" />
            <Image className="profile" src="./Assets/PNG/profile.png" />
        </div>
    );
};

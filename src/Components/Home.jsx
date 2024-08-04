import React from "react";
import './Home.css';
import { Button, Image } from "react-bootstrap";
import SearchBarHome from "./SearchBarHome";

export const Home = ({ searchTerm, setSearchTerm, user_logged }) => {
    
    return (
        <div className="home">
            <img className="fondo" src='/Assets/JPG/fondo_app.jpg' alt="fondo" />
            <Image href="/" className="logo" src="./Assets/PNG/logo.png" />
            <SearchBarHome id="searchbar" searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            {!user_logged && ( 
                <>
                    <Button id="login" href="/Login" className="button-left" type="primary">Login</Button>
                    <Button id="register" variant="primary" href="/Register" className="button-right">Register</Button>
                </>
            )}
        </div>
    );
}

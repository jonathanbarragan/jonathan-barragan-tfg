import React from "react";
import './Home.css';
import { Button, Image } from "react-bootstrap";
import SearchBarHome from "./SearchBarHome";

export const Home = ({ searchTerm, setSearchTerm }) => {
    
    return (
        <div className="home">
            <img className="fondo" src='/Assets/JPG/fondo_app.jpg' alt="fondo" />
            <Image href="/" className="logo" src="./Assets/PNG/logo.png" />
            <SearchBarHome searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
            <Button id="open_chat" href="/Login" className="button-left" type="primary">Login</Button>
            <Button variant="primary" href="/Register" className="button-right">Register</Button>
        </div>
    );
}

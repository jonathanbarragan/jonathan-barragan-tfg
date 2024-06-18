import React from "react";
import './Home.css';
import { Button, Image } from "react-bootstrap";
import SearchBar from "./SearchBarHome";


export const Home=() => {
    return(
        <div className="home">
            <img className="fondo" src='/Assets/JPG/fondo_app.jpg' alt="fondo" />
            <Image href="/" className="logo" src="./Assets/PNG/logo.png" />
            <SearchBar />
            <Button id="open_chat" href="/Login" className="button-left" type="primary">Login</Button>
            <Button variant="primary" href="/Register" className="button-right">Register</Button>
        </div>
    );
}
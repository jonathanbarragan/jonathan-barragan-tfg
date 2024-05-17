import React, { useState, useEffect } from "react";
import { Button, Col, Container, Image, Row } from "react-bootstrap";
import './App.css';
import SearchBar from "./Components/SearchBar";
import { Login } from "./Components/Login";
import { Cabecera } from "./Components/Cabecera";
import { getAuth, onAuthStateChanged } from 'firebase/auth'
import { Register } from "./Components/Register";


function App() {
  
  // Estado para controlar la visibilidad del componente Login
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const handleLoginClick = () => {
    // Cambiar el estado para mostrar el componente Login
    setShowLogin(!showLogin);
  };
  const handleReturnHomeClick = () => {
    // Cambiar el estado para mostrar LandingPage
    setShowLogin(false);
    setShowRegister(false);
  };
  const handleRegisterClick = () => {
    // Cambiar el estado para mostrar el componente Register
    setShowRegister(!showRegister);
  };

  if (showLogin === false && showRegister === false) {
    return (
      <div className="App">
        <div className="home">
          <Image className="fondo" src='./Assets/JPG/fondo_app.jpg' />
          <Image className="logo" src="./Assets/PNG/logo.png" />
          <SearchBar placeholder="Escribe aqui..." ></SearchBar>
          <Button onClick={handleLoginClick} className="button-left" variant="primary" >Login</Button>
          <Button onClick={handleRegisterClick} className="button-right" variant="primary">Register</Button>
        </div>
      </div>
    );
  } else {
    if(showLogin === true){
      return (
        <div className="web">
          <Cabecera/>
          <Login />
          <Button onClick={handleReturnHomeClick}> Return Home</Button>
        </div>
  
      );
    }
    if(showRegister === true){
      return(
        <div className="web">
          <Cabecera />
          <Register />
          <Button onClick={handleReturnHomeClick}> Return Home</Button>
        </div>
      )
    }
    
  }
}

export default App;

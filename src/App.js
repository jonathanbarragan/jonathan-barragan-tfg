import React, { useState, useEffect } from "react";
import { Button, Image } from "react-bootstrap";
import './App.css';
import SearchBar from "./Components/SearchBar";
import { Login } from "./Components/Login";
import { Cabecera } from "./Components/Cabecera";
import { getAuth, onAuthStateChanged } from 'firebase/auth';
import { Register } from "./Components/Register";
import {Resultados} from './Components/Resultados';

function App() {
  
  // Estado para controlar la visibilidad del componente Login
  const [showRegister, setShowRegister] = useState(false);
  const [showLogin, setShowLogin] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  const [showSearchResults, setShowSearchResults] = useState(false);

  const handleLoginClick = () => {
    // Cambiar el estado para mostrar el componente Login
    setShowLogin(!showLogin);
    setShowRegister(false);
    setShowSearchResults(false);
  };
  const handleReturnHomeClick = () => {
    // Cambiar el estado para mostrar LandingPage
    setShowLogin(false);
    setShowRegister(false);
    setShowSearchResults(false);

  };
  const handleRegisterClick = () => {
    // Cambiar el estado para mostrar el componente Register
    setShowLogin(false);
    setShowSearchResults(false);
    setShowRegister(!showRegister);
  };
  const handleSearchClick = () => {
    // Cambiar el estado para mostrar elp componente Login
    setShowSearchResults(true);
    setShowLogin(false);
    setShowRegister(false);
  };

  return (
    <div className="App">
      {showLogin === false && showRegister === false && showSearchResults=== false ?   (
        <div className="home">
          <Image className="fondo" src='./Assets/JPG/fondo_app.jpg' />
          <Image onClick={handleReturnHomeClick} className="logo" src="./Assets/PNG/logo.png" />
          <SearchBar
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchClick={handleSearchClick}
            showSearchResults={showSearchResults}
          />
          <Button id="open_chat" onClick={handleLoginClick} className="button-left" type="primary">
            Login
          </Button>
          <Button variant="primary" onClick={handleRegisterClick} className="button-right">
            Register
          </Button>
        </div>
      ) : (
        <div className="web">
          <Cabecera 
            onReturnHomeCLick={handleReturnHomeClick}
            searchTerm={searchTerm}
            setSearchTerm={setSearchTerm}
            handleSearchClick={handleSearchClick}
            showSearchResults={showSearchResults}
          />
          {showLogin && <Login onReturnHomeClick={handleReturnHomeClick}/>}
          {showRegister && <Register onClick={handleReturnHomeClick}/>}
          {showSearchResults && <Resultados search={searchTerm} />}
          <Button onClick={handleReturnHomeClick}> Return Home</Button>
        </div>
      )}
      
    </div>
  );
}

export default App;

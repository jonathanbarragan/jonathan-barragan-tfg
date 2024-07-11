import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { Carrito } from './Components/Carrito';
import { Home } from './Components/Home';
import { Productos } from './Components/Productos'; 
import { Resultados } from "./Components/Restaurant";
import { Cabecera } from "./Components/Cabecera";
import { Profile } from "./Components/Profile";
import { Footer } from "./Components/Footer";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {!isHomePage && <Cabecera searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}

      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm}/>} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<Profile />} />
        <Route path="/Restaurant" element={<Resultados search={searchTerm} />} />
        <Route path="/productos/:restauranteNombre" element={<Productos cart={cart} setCart={setCart} />} />
        <Route path="/cart" element={<Carrito cart={cart} setCart={setCart} />} />
      </Routes>

    </>
  );
}

export default App;

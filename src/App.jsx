import React, { useState, useEffect } from "react";
import { Routes, Route } from "react-router-dom";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { Carrito } from './Components/Carrito';
import { Home } from './Components/Home';
import { Productos } from './Components/Productos'; 
import { Resultados } from "./Components/Restaurant";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });

  useEffect(() => {
    localStorage.setItem('cart', JSON.stringify(cart));
  }, [cart]);

  const addToCart = (product) => {
    const existingProductIndex = cart.findIndex(
      (item) => item.name === product.name && item.restaurant === product.restaurant

    );

    let newCart = [];
    if (existingProductIndex >= 0) {
      newCart = cart.map((item, index) => {
        if (index === existingProductIndex) {
          return { ...item, quantity: item.quantity + 1 };
        }
        return item;
      });
    } else {
      newCart = [...cart, { ...product, quantity: 1 }];
    }

    setCart(newCart);
  };

  const removeFromCart = (productIndex) => {
    const newCart = cart.filter((_, index) => index !== productIndex);
    setCart(newCart);
    console.log("Cart after removing a product:", newCart); 
  };

  return (
    <Routes>
      <Route path="/" element={<Home setSearchTerm={setSearchTerm} />} />
      <Route path="/Login" element={<Login />} />
      <Route path="/Register" element={<Register />} />
      <Route path="/Restaurant" element={<Resultados search={searchTerm} />} />
      <Route path="/productos/:restauranteNombre" element={<Productos addToCart={addToCart} />} />
      <Route path="/cart" element={<Carrito cart={cart} removeFromCart={removeFromCart} />} />
    </Routes>
  );
}

export default App;

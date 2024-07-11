import React, { useState, useEffect } from "react";
import { Routes, Route, useLocation } from "react-router-dom";
import { Login } from "./Components/Login";
import { Register } from "./Components/Register";
import { Profile } from "./Components/Profile";
import { Resultados } from "./Components/Restaurant";
import { Cabecera } from "./Components/Cabecera";
import { Productos } from "./Components/Productos"; 
import { Carrito } from './Components/Carrito';
import { Home } from './Components/Home';
import { Footer } from "./Components/Footer";
import { getAuth, onAuthStateChanged } from "firebase/auth";

function App() {
  const [searchTerm, setSearchTerm] = useState('');
  const [cart, setCart] = useState(() => {
    const savedCart = localStorage.getItem('cart');
    return savedCart ? JSON.parse(savedCart) : [];
  });
  const [userId, setUserId] = useState(null); // Inicialmente null

  useEffect(() => {
    const auth = getAuth();
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setUserId(user.uid);
        // Push al dataLayer cuando el usuario está autenticado
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push({
          event: "user_loaded",
          user_id: user.uid
        });
      } else {
        setUserId(null); // Si no hay usuario autenticado, user_id es null
      }
    });

    return () => unsubscribe();
  }, []);

  const handleLogout = () => {
    const auth = getAuth();
    auth.signOut().then(() => {
      // Push al dataLayer al hacer logout
      window.dataLayer.push({
        event: "logout",
        user_id: null // Poner user_id a null al hacer logout
      });
      localStorage.removeItem('user');
    }).catch((error) => {
      console.error('Error al realizar sign out:', error);
    });
  };

  const location = useLocation();
  const isHomePage = location.pathname === '/';

  return (
    <>
      {!isHomePage && <Cabecera searchTerm={searchTerm} setSearchTerm={setSearchTerm} />}

      <Routes>
        <Route path="/" element={<Home searchTerm={searchTerm} setSearchTerm={setSearchTerm} />} />
        <Route path="/Login" element={<Login />} />
        <Route path="/Register" element={<Register />} />
        <Route path="/Profile" element={<Profile userId={userId} handleLogout={handleLogout} />} />
        <Route path="/Restaurant" element={<Resultados search={searchTerm} userId={userId} />} />
        <Route path="/productos/:restauranteNombre" element={<Productos cart={cart} setCart={setCart} userId={userId} />} />
        <Route path="/cart" element={<Carrito cart={cart} setCart={setCart} userId={userId} />} />
      </Routes>

      <Footer />
    </>
  );
}

export default App;

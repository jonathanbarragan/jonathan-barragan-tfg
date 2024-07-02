import React, { useState } from "react";
import "./Login.css";
import { Button, Modal } from "react-bootstrap";
import { auth, db } from "../firebase"; // Importar auth y db desde firebase.js
import { signInWithEmailAndPassword } from "firebase/auth";
import { doc, getDoc } from "firebase/firestore"; // Importar Firestore
import { useNavigate } from "react-router-dom";

export const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  const signIn = (e) => {
    e.preventDefault();
    setLoading(true);
    setError(null);
    signInWithEmailAndPassword(auth, email, password)
      .then((userCredential) => {
        const user = userCredential.user;
        localStorage.setItem('user', JSON.stringify(user));
        // Pushing data to the data layer for analytics purposes
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
          event: "login",
          user_id: user.uid,
        });

        // Redirigir al usuario a la página de Restaurant
        navigate("/Restaurant");
      })
      .catch((error) => {
        setError(error.message); // Guardar el mensaje de error en el estado
        setLoading(false); // Desactivar el estado de carga
        
        window.dataLayer.push({ ecommerce: null });
        window.dataLayer.push({
          event: "login_error",
          error: error.message,
        });

      });
  };
  const handleClose = () => {
    setError(null); // Limpiar el estado de error al cerrar el pop-up
  };
  return (
    <div>
      <div className="container">
        <form onSubmit={signIn} className="card card-body shadow-lg">
          <label htmlFor="email">Email</label>
          <input
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            type="email"
            placeholder="Enter your email"
            id="email"
            name="email"
            className="textBox"
            required
          />
          <label htmlFor="password">Password</label>
          <input
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            type="password"
            placeholder="********"
            id="password"
            name="password"
            className="textBox"
            required
          />
          <Button type="submit" className="btn-login" disabled={loading}>
            {loading ? "Cargando..." : "Log In"}
          </Button>
          <Button href="/Register" className="btn-register" disabled={loading}>
            Si no tienes una cuenta, Registrate
          </Button>
          {error && <p className="error">{error}</p>}
        </form>
      </div>
      <Modal show={error !== null} onHide={handleClose}>
        <Modal.Header closeButton>
          <Modal.Title>Error de inicio de sesión</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <p>Incorrect email or passoword</p>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Cerrar
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

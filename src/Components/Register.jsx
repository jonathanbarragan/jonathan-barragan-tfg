// Register.js
import React, { useState } from "react";
import "./Register.css";
import { Button } from "react-bootstrap";
import { auth, db } from "../firebase"; // Importar auth y db desde firebase.js
import { createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore"; // Importar Firestore
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [direction, setDirection] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();
  
    const handleSubmit = (e) => {
      e.preventDefault();
      createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          updateProfile(user, {
            displayName: name,
          }).then(() => {
            setDoc(doc(db, 'users', user.uid), {
              direction: direction,
              city: city
            });
            window.dataLayer.push({
              event: "register",
              user_id: user.uid
            });
            navigate("/Profile");
          }).catch((error) => {
            console.error('Error updating profile:', error);
          });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          console.error(error);
        });
    };

    return (
        <div>
            <div className="container">
                <h2>Registro</h2>
                <form onSubmit={handleSubmit} className="card card-body shadow-lg">
                    <label htmlFor="name">Name </label>
                    <input value={name} onChange={(e) => setName(e.target.value)} type="text" placeholder="Enter your name" id="name" name="name" className="textBox" />
                    <label htmlFor="email">Email </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type="email" placeholder="Enter your email" id="email" name="email" className="textBox" />
                    <label htmlFor="password">Password </label>
                    <input value={password} onChange={(e) => setPassword(e.target.value)} type="password" placeholder="********" id="password" name="password" className="textBox" />
                    <label htmlFor="direction">Direction </label>
                    <input value={direction} onChange={(e) => setDirection(e.target.value)} type="text" placeholder="Av. Diagonal, 24, 3o 2a" id="direction" name="direction" className="textBox" />
                    <label htmlFor="city">City </label>
                    <input value={city} onChange={(e) => setCity(e.target.value)} type="text" placeholder="Barcelona" id="city" name="city" className="textBox" />
                    <Button id="register" type="submit" className="btn-register">Register</Button>
                    <Button id="login" href="/Login" className="btn-login">Si ya tienes una cuenta, Inicia Sesión</Button>
                </form>
            </div>
        </div>
    )
}
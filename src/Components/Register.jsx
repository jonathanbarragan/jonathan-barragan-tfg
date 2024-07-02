import React, { useState } from "react";
import "./Register.css";
import { Button } from "react-bootstrap";
import { getFirestore, doc, setDoc } from "firebase/firestore"; 
import { getAuth, createUserWithEmailAndPassword, updateProfile } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [direction, setDirection] = useState('');
    const [city, setCity] = useState('');
    const navigate = useNavigate();
    const auth = getAuth(); // Initialize auth here

    const handleSubmit = (e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
            .then((userCredential) => {
                const user = userCredential.user;

                // Actualizar el perfil del usuario
                updateProfile(user, {
                    displayName: name,
                }).then(() => {
                    console.log("Perfil actualizado:", user);
                    
                    const db = getFirestore();
                    setDoc(doc(db, "users", user.uid), {
                        direction: direction,
                        city: city
                    });

                    window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
                    window.dataLayer.push({
                        event: "sign_up",
                        user_id: user.uid,
                        user_city:user.city
                    });

                    navigate("/Login");
                }).catch((error) => {
                    console.error("Error actualizando el perfil:", error);
                });
            })
            .catch((error) => {
                const errorCode = error.code;
                const errorMessage = error.message;
                console.log(error);
            });
    }

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
                    <Button type="submit" className="btn-login">Register</Button>
                    <Button href="/Login" className="btn-register">Si ya tienes una cuenta, Inicia Sesión</Button>
                </form>
            </div>
        </div>
    )
}

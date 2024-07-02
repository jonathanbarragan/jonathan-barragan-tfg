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
    const [error, setError] = useState(null);
    const navigate = useNavigate();
    const auth = getAuth(); // Initialize auth here

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Verificar si el correo electrónico ya está en uso
            const existingUser = await auth.fetchSignInMethodsForEmail(email);
            if (existingUser.length > 0) {
                throw new Error('auth/email-already-in-use');
            }

            // Crear el usuario con correo y contraseña
            const userCredential = await createUserWithEmailAndPassword(auth, email, password);
            const user = userCredential.user;

            // Actualizar el perfil del usuario
            await updateProfile(user, {
                displayName: name,
            });

            // Guardar la dirección y ciudad en Firestore
            const db = getFirestore();
            await setDoc(doc(db, "users", user.uid), {
                direction: direction,
                city: city
            });

            console.log("Usuario registrado exitosamente:", user);

            navigate("/Login");
        } catch (error) {
            if (error.code === 'auth/email-already-in-use') {
                setError('El correo electrónico ya está en uso. Por favor, utiliza otro correo electrónico.');
            } else {
                setError('Error al registrar el usuario: ' + error.message);
            }
        }
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
                    <Button type="submit" className="btn-login">Register</Button>
                    <Button href="/Login" className="btn-register">Si ya tienes una cuenta, Inicia Sesión</Button>
                    {error && <p className="error">{error}</p>}
                </form>
            </div>
        </div>
    );
};

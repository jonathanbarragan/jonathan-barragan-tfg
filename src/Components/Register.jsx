import React, {useState} from "react"
import "./Register.css";
import { Button, Image } from "react-bootstrap";
import {auth, app} from "../firebase"
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";

export const Register =() =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const [direction, setDirection] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const navigate = useNavigate('');
    const handleSubmit =(e) => {
        e.preventDefault();
        createUserWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
            const user = userCredential.user;
            navigate("/Restaurant");
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
                <label for ="name">Name </label>
                <input value={name} onChange={(e) => setName(e.target.value)} type= "name" placeholder= "Enter your name" id ="name" name="name" className="textBox"/>
                <label for ="email">Email </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type= "email" placeholder= "Enter your email" id ="email" name="email" className="textBox"/>
                <label for ="password">Password </label>
                <input value= {password} onChange={(e) => setPassword(e.target.value)} type= "password" placeholder= "********" id ="password" name="password" className="textBox"/>
                <label for ="direction">Direction </label>
                <input value= {direction} onChange={(e) => setDirection(e.target.value)} type= "direction" placeholder= "Av. Diagonal, 24, 3o 2a" id ="direction" name="direction" className="textBox"/>
                <label for ="postalCode">Postal Code </label>
                <input value= {postalCode} onChange={(e) => setPostalCode(e.target.value)} type= "postalCode" placeholder= "08190" id ="postalCode" name="postalCode" className="textBox"/>
                <Button type="submit" className="btn-login">Register</Button>
                <Button href="/Login" className="btn-register">Si ya tienes una cuenta, Inicia Sesión</Button>
            </form>
        </div>
        </div>
        
    )
    
}
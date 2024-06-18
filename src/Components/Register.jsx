import React, {useState} from "react"
import "./Register.css";
import { Button } from "react-bootstrap";
import { Cabecera } from "./Cabecera";

export const Register =() =>{
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [pass,setPass] = useState('');
    const [direction, setDirection] = useState('');
    const [postalCode,setPostalCode] = useState('');
    const handleSubmit =(e) => {
        e.preventDefault();
        console.log(email);
    }
    const [showRegister, setShowRegister] = useState(false);
    const handleRegisterClick = () => {
        // Cambiar el estado para mostrar el componente Register
        setShowRegister(!showRegister);
    };

    const [showLogin, setShowLogin] = useState(false);
    const handleLoginClick = () => {
        // Cambiar el estado para mostrar el componente Register
        setShowLogin(!showLogin);
    };

    return (
        <div>
            <div className="container">
            <h2>Registro</h2>
            <form onSubmit={handleSubmit} className="card card-body shadow-lg">
                <label for ="name">Name </label>
                <input value={name} onChange={(e) => setName(e.target.value)} type= "email" placeholder= "Enter your name" id ="name" name="name" className="textBox"/>
                <label for ="email">Email </label>
                <input value={email} onChange={(e) => setEmail(e.target.value)} type= "email" placeholder= "Enter your email" id ="email" name="email" className="textBox"/>
                <label for ="password">Password </label>
                <input value= {pass} onChange={(e) => setPass(e.target.value)} type= "password" placeholder= "********" id ="password" name="password" className="textBox"/>
                <label for ="direction">Direction </label>
                <input value= {direction} onChange={(e) => setDirection(e.target.value)} type= "direction" placeholder= "Av. Diagonal, 24, 3o 2a" id ="direction" name="direction" className="textBox"/>
                <label for ="postalCode">Postal Code </label>
                <input value= {postalCode} onChange={(e) => setPostalCode(e.target.value)} type= "postalCode" placeholder= "08190" id ="postalCode" name="postalCode" className="textBox"/>
                <Button onClick={handleRegisterClick} type="submit" className="btn-login">Register</Button>
                <Button href="/Login" className="btn-register">Si ya tienes una cuenta, Inicia Sesión</Button>
            </form>
        </div>
        </div>
        
    )
    
}
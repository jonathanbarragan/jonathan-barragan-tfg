import React, {useState, useEffect} from "react"
import "./Login.css";
import { Button, Image } from "react-bootstrap";

import { Register } from "./Register";
import { Cabecera } from "./Cabecera";

export const Login =() =>{
    const [email, setEmail] = useState('');
    const [pass,setPass] = useState('');
    const [showRegister, setShowRegister] = useState(false);

    const handleSubmit =(e) => {
        e.preventDefault();
        console.log(email);
    }
    const handleRegisterClick = () => {
        // Cambiar el estado para mostrar el componente Register
        setShowRegister(!showRegister);
    };
    
      return (
        <div> 
          <Cabecera/>
          <div className="container">
            
            <form onSubmit={handleSubmit} className="card card-body shadow-lg">
              <label htmlFor="email">Email</label>
              <input 
                value={email} 
                onChange={(e) => setEmail(e.target.value)} 
                type="email" 
                placeholder="Enter your email" 
                id="email" 
                name="email" 
                className="textBox" 
              />
              <label htmlFor="password">Password</label>
              <input 
                value={pass} 
                onChange={(e) => setPass(e.target.value)} 
                type="password" 
                placeholder="********" 
                id="password" 
                name="password" 
                className="textBox" 
              />
              <Button type="submit" className="btn-login">Log In</Button>
              <Button href="/Register" className="btn-register">Si no tienes una cuenta, Registrate</Button>
            </form>
          </div>
        </div>
      );
}
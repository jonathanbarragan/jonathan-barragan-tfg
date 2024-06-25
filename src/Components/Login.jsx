import React, {useState, useEffect} from "react"
import "./Login.css";
import { Button, Image } from "react-bootstrap";
import {auth, app} from "../firebase"
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { useNavigate } from "react-router-dom";


export const Login =() =>{
    const [email, setEmail] = useState('');
    const [password,setPassword] = useState('');
    const navigate = useNavigate('');

    const handleSubmit =(e) => {
      e.preventDefault();
        signInWithEmailAndPassword(auth, email, password)
        .then((userCredential) => {
          const user = userCredential.user;
          console.log(user);
          navigate("/Restaurant");
      })
      .catch((error) => {
        console.log(error);
      });
    }    
      return (
        <div> 
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
                value={password} 
                onChange={(e) => setPassword(e.target.value)} 
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
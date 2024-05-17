import React, {useState} from "react"
import "./Login.css";
import { Register } from "./Register";
import { Cabecera } from "./Cabecera";

export const Login =() =>{
    const [email, setEmail] = useState('');
    const [pass,setPass] = useState('');
    const handleSubmit =(e) => {
        e.preventDefault();
        console.log(email);
    }
    const [showRegister, setShowRegister] = useState(false);
    const handleRegisterClick = () => {
        // Cambiar el estado para mostrar el componente Register
        setShowRegister(!showRegister);
    };
    if(showRegister === false){
        return (
            <div className="container">
                <form onSubmit={handleSubmit} className="card card-body shadow-lg">
                    <label for ="email">Email </label>
                    <input value={email} onChange={(e) => setEmail(e.target.value)} type= "email" placeholder= "Enter your email" id ="email" name="email" className="textBox"/>
                    <label for ="password">Password </label>
                    <input value= {pass} onChange={(e) => setPass(e.target.value)} type= "password" placeholder= "********" id ="password" name="password" className="textBox"/>
                    <button type="submit" className="btn-login">Log In</button>
                    <button onClick={handleRegisterClick} className="btn-register">Si no tienes una cuenta, Registrate</button>
                </form>
            </div>
        )
    }else{
        return(
            <Register />
        )
    }
}
import React from "react";
import { Image } from "react-bootstrap";
import { useNavigate } from 'react-router-dom';
import "./Footer.css";

export const Footer = () => {
    const navigate = useNavigate();

    const openChat = () => {
        alert("Abrir chat de soporte");
    };

    return (
        <div className="footer-container">
            <div className="footer-links">
                <a href="/privacy-policy">Política de Privacidad</a>
                <a href="/terms-of-service">Términos de Servicio</a>
                <a href="/contact">Contacto</a>
            </div>
            <button id="open_chat" className="chat-button" onClick={openChat}>
                Chat de Soporte
            </button>
        </div>
    );
};

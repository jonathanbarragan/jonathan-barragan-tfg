import React, { useState, useEffect } from 'react';
import './Carrito.css';
import { Button, Image, FormControl } from "react-bootstrap";
import { Cabecera } from './Cabecera';
import { useNavigate, useParams } from 'react-router-dom';

export const Carrito = ({ cart, removeFromCart }) => {
    const [cantidades, setCantidades] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        setCantidades(cart.map(item => item.quantity)); // Inicializa las cantidades según el carrito
    }, [cart]);
    
    const aumentarCantidad = (index) => {
        const newCantidades = [...cantidades];
        newCantidades[index] += 1;
        setCantidades(newCantidades);
    };

    const disminuirCantidad = (index) => {
        const newCantidades = [...cantidades];
        if (newCantidades[index] > 1) {
            newCantidades[index] -= 1;
            setCantidades(newCantidades);
        }
    };

    const calcularTotal = () => {
        return cart.reduce((total, product, index) => total + (product.price * cantidades[index]), 0);
    };

    return (
        <div className='fondo-cart'>
            <div class="cart-container">
                <button onClick={() => navigate(-1)}>Volver</button>

                <h2>Productos en el carrito:</h2>
                
                <div class="cart-list">
                    {cart.map((product, index) => (
                        <div class="cart-item" key={index}>
                            <div class="cart-thumbnail">
                                <img src={product.foto} alt={product.name} />
                            </div>
                            <div class="cart-details">
                                <p><strong>{product.name}</strong></p>
                                <p>Precio: {product.price}€</p>
                                <p>Restaurante: {product.restaurant}</p>
                            </div>
                            <div class="cart-quantity">
                                <Button variant='light' onClick={() => disminuirCantidad(index)}>-</Button>
                                <input type="number" value={cantidades[index]} onChange={(e) => {
                                    const newCantidades = [...cantidades];
                                    newCantidades[index] = parseInt(e.target.value) || 1;
                                    setCantidades(newCantidades);
                                }} />
                                <Button variant='light' onClick={() => aumentarCantidad(index)}>+</Button>
                                <Button variant='danger' onClick={() => removeFromCart(index)}>Remove</Button>
                            </div>
                        </div>
                    ))}
                </div>
                <div className='cart-total'>
                    <h3>Total: {calcularTotal()}€</h3>
                    <Button variant='success'>Realizar Compra</Button>
                    </div>
            </div>
        </div>
    );
};

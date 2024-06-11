import React, { useState, useEffect } from 'react';
import './Carrito.css';
import { Button, Image, FormControl } from "react-bootstrap";

export const Carrito = ({ cart, removeFromCart}) => {
    const [cantidades, setCantidades] = useState([]);

    useEffect(() => {
        setCantidades(cart.map(() => 1)); // Inicializa las cantidades a 1 cada vez que cambie el carrito
    }, [cart]);

    const aumentarCantidad = (index) => {
        setCantidades(cantidades.map((cantidad, i) => i === index ? cantidad + 1 : cantidad));
    };

    const disminuirCantidad = (index) => {
        setCantidades(cantidades.map((cantidad, i) => i === index && cantidad > 1 ? cantidad - 1 : cantidad));
    };
    const calcularTotal = () => {
        return cart.reduce((total, product, index) => total + (product.price * cantidades[index]), 0);
    };

    const handlePurchaseClick = () => {
        // Preparar los datos de los productos para el dataLayer
        const ecommerceData = {
            event: "purchase",
            ecommerce: {
                currency: 'EUR',
                value: 10.00,
                transaction_id: "T12345", // ID de transacción única (puedes generar uno dinámicamente si es necesario)
                items: cart.map((product, index) => ({
                    name: product.name,
                    id: product.id,
                    price: product.price,
                    quantity: cantidades[index],
                    restaurant: product.restaurant
                })) 
            }
        };
        // Realizar el push al dataLayer
        window.dataLayer = window.dataLayer || [];
        window.dataLayer.push(ecommerceData);

        console.log("Datos de compra enviados al dataLayer:", ecommerceData);
    };
    return (
        <div className="cart-container">
            <h2>Productos en el carrito:</h2>
            <div className="products-row d-flex flex-wrap">
                {cart.map((product, index) => (
                    <div className="product-item d-flex align-items-center" key={index}>
                        <Image src={product.foto} className='product-foto' />
                        <div className="product-info d-flex flex-column ms-3">
                            <p>{product.name}</p>
                            <p>Precio: {product.price}€</p>
                            <p>Restaurante: {product.restaurant}</p> {/* Mostrar el nombre del restaurante */}
                        </div>
                        <div className="product-quantity d-flex align-items-center ms-auto">
                            <Button variant="outline-secondary" onClick={() => disminuirCantidad(index)}>-</Button>
                            <FormControl 
                                value={cantidades[index]} 
                                onChange={(e) => {
                                    const newCantidades = [...cantidades];
                                    newCantidades[index] = parseInt(e.target.value) || 1;
                                    setCantidades(newCantidades);
                                }} 
                            />
                            <Button variant="outline-secondary" onClick={() => aumentarCantidad(index)}>+</Button>
                        </div>
                        <Button variant="danger" onClick={() => removeFromCart(index)}>Remove</Button>
                    </div>
                ))}
            </div>
            <h3>Total: {calcularTotal()}€</h3> {/* Mostrar el precio total de la compra */}
            <Button id="purchase" variant="success" onClick={handlePurchaseClick}>Realizar Compra</Button>
        </div>
    );
};

import React, { useState } from 'react';
import './Carrito.css';
import { Button, Image, FormControl } from "react-bootstrap";

export const Carrito = ({ cart }) => {
    const [cantidad, setCantidad] = useState(1);

    const aumentarCantidad = () => {
        setCantidad(cantidad + 1);
    };

    const disminuirCantidad = () => {
        if (cantidad > 1) {
            setCantidad(cantidad - 1);
        }
    };

    return (
        <div className="cart-container">
            <h2>Productos en el carrito:</h2>
            <div className="products-row d-flex flex-wrap">
                {cart.map((product, index) => (
                    <div className="product-item d-flex align-items-center" key={index}>
                        <Image src={product.foto} className='product-foto' />
                        <div className="product-info d-flex flex-row ms-3">
                            <p>{product.name}</p>
                            <p>Precio: {product.price}€</p>
                        </div>
                        <div className="product-quantity d-flex align-items-center ms-auto">
                            <Button variant="outline-secondary" onClick={disminuirCantidad}>-</Button>
                            <FormControl value={cantidad} onChange={(e) => setCantidad(parseInt(e.target.value))} />
                            <Button variant="outline-secondary" onClick={aumentarCantidad}>+</Button>
                        </div>
                    </div>
                ))}
            </div>
            <Button id="purchase" variant="success">Realizar Compra</Button>
        </div>
    );
};

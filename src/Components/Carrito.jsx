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

    const getUniqueRestaurants = () => {
        const restaurantNames = cart.map(product => product.restaurant);
        return [...new Set(restaurantNames)]; // Eliminar duplicados
    };

    const handlePurchase = () => {
        
        const uniqueRestaurants = getUniqueRestaurants();

        window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
        window.dataLayer.push({
        event: "purchase",
        ecommerce: {
            transaction_id: "T_12345",
            // Sum of (price * quantity) for all items.
            value: 72.05,
            tax: 3.60,
            shipping: 5.99,
            currency: "USD",
            coupon: "SUMMER_SALE",
            items: [
            {
            item_id: "SKU_12345",
            item_name: "Stan and Friends Tee",
            affiliation: "Google Merchandise Store",
            coupon: "SUMMER_FUN",
            discount: 2.22,
            index: 0,
            item_brand: "Google",
            item_category: "Apparel",
            item_category2: "Adult",
            item_category3: "Shirts",
            item_category4: "Crew",
            item_category5: "Short sleeve",
            item_list_id: "related_products",
            item_list_name: "Related Products",
            item_variant: "green",
            location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
            price: 10.01,
            quantity: 3
            },
            {
            item_id: "SKU_12346",
            item_name: "Google Grey Women's Tee",
            affiliation: "Google Merchandise Store",
            coupon: "SUMMER_FUN",
            discount: 3.33,
            index: 1,
            item_brand: "Google",
            item_category: "Apparel",
            item_category2: "Adult",
            item_category3: "Shirts",
            item_category4: "Crew",
            item_category5: "Short sleeve",
            item_list_id: "related_products",
            item_list_name: "Related Products",
            item_variant: "gray",
            location_id: "ChIJIQBpAG2ahYAR_6128GcTUEo",
            price: 21.01,
            promotion_id: "P_12345",
            promotion_name: "Summer Sale",
            quantity: 2
            }]
        }
        });
        alert('Gracias por la compra');
        // Opcionalmente, podrías vaciar el carrito después de la compra
        setCantidades([]);
        removeFromCart(); // Define esta función para vaciar el carrito si es necesario
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
                    <Button variant='success' onClick={handlePurchase}>Realizar Compra</Button>
                    </div>
            </div>
        </div>
    );
};

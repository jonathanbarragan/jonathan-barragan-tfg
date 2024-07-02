import React, { useEffect, useState } from "react";
import data from "../restaurantes.json";
import { Button, Image } from "react-bootstrap";
import "./Productos.css";
import { useNavigate, useParams } from 'react-router-dom';
import { Cabecera } from "./Cabecera";

export const Productos = ({addToCart }) => {
    const { restauranteNombre } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();
    const [restaurantNames, setRestaurantNames] = useState(() => {
        // Obtener el valor inicial desde localStorage
        const savedRestaurantNames = localStorage.getItem('restaurantNames');
        return savedRestaurantNames ? JSON.parse(savedRestaurantNames) : [];
    });

    useEffect(() => {
        const fetchRestaurant = async () => {
            try {
                const restaurantData = data.restaurantes.find(r => r.name === restauranteNombre);
                setRestaurant(restaurantData);
            } catch (error) {
                console.error('Error fetching restaurant:', error);
            }
        };

        fetchRestaurant();
    }, [restauranteNombre]);

    const handleAddToCart = (product) => {
        const productWithRestaurant = {
            ...product,
            restaurant: restaurant.name,
        };

    
        addToCart(productWithRestaurant);
         // Actualizar dataLayer después de actualizar restaurantNames
         window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
         window.dataLayer.push({
             event: "add_to_cart",
             ecommerce: {
                 value: product.value,
                 currency: product.currency,
                 coupon: "SUMMER_SALE",
                 items: [
                    {
                        item_id: product.id,
                        item_name: product.name,
                        affiliation: restaurant.name,
                        price: product.price,       
                    }
                ]
             }
         });
    };

    if (!restaurant) {
        return <div>Loading...</div>;
    }

    return (
      <div className="fondo-product">
        <div className="productos-container">
            <button onClick={() => navigate(-1)}>Volver</button>
            <h2>{restaurant.name}</h2>
            <p>{restaurant.location}</p>
            <h3>Productos:</h3>
            <div className="products-list">
                {restaurant.products.map(product => (
                    <div className="card card-body" key={product.name}>
                        <div className="product-item">
                            <div className="product-info">
                                <Image src={product.foto} className="product-foto" />
                                <p><b>{product.name} </b>- {product.price} {product.currency}</p>
                                <p>{product.description}</p>
                            </div>
                            <Button className="add_to_cart" variant="success" onClick={() => handleAddToCart(product)}>Añadir al carrito</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
      </div>
    );
};

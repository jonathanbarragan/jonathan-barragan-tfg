import React, { useEffect, useState } from "react";
import data from "../restaurantes.json";
import { Button, Image } from "react-bootstrap";
import "./Productos.css";
import { useNavigate, useParams } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export const Productos = ({ cart, setCart }) => {
    const { restauranteNombre } = useParams();
    const [restaurant, setRestaurant] = useState(null);
    const navigate = useNavigate();
    const [restaurantNames, setRestaurantNames] = useState(() => {
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

    const addToCart = (product) => {
        const productWithRestaurant = {
            ...product,
            restaurant: restaurant.name,
        };

        const existingProductIndex = cart.findIndex(
            (item) => item.name === productWithRestaurant.name && item.restaurant === productWithRestaurant.restaurant
        );

        let newCart = [];
        if (existingProductIndex >= 0) {
            newCart = cart.map((item, index) => {
                if (index === existingProductIndex) {
                    return { ...item, quantity: item.quantity + 1 };
                }
                return item;
            });
        } else {
            newCart = [...cart, { ...productWithRestaurant, quantity: 1 }];
        }

        setCart(newCart);
        handleDataLayerPush(productWithRestaurant);

        toast.success(`${product.name} añadido al carrito!`);
    };

    const handleDataLayerPush = (product) => {
        window.dataLayer.push({ ecommerce: null });  
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
                        affiliation: product.restaurant,
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
            <Button id="return" onClick={() => navigate(-1)}>Volver</Button>
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
                            <Button id="add_to_cart" className="add_to_cart" variant="success" onClick={() => addToCart(product)}>Añadir al carrito</Button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
        <ToastContainer autoClose={3000} />
      </div>
    );
};

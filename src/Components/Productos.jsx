import React, { useEffect, useState } from "react";
import data from "../restaurantes.json";
import { Button, Image } from "react-bootstrap";
import "./Productos.css";
import { useNavigate, useParams } from 'react-router-dom';
import { Cabecera } from "./Cabecera";

export const Productos = ({ addToCart }) => {
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

        // Actualizar restaurantNames y después usarlo en dataLayer
        setRestaurantNames((prevRestaurantNames) => {
            const updatedRestaurantNames = [...prevRestaurantNames, restaurant.name];

            // Guardar en localStorage
            localStorage.setItem('restaurantNames', JSON.stringify(updatedRestaurantNames));

            // Actualizar dataLayer después de actualizar restaurantNames
            window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
            window.dataLayer.push({
                event: "add_to_cart",
                ecommerce: {
                    transaction_id: "T_12345",
                    value: product.value,
                    tax: 3.60,
                    shipping: 5.99,
                    currency: product.currency,
                    coupon: "SUMMER_SALE",
                    restaurant: updatedRestaurantNames,
                    items: [
                        {
                            item_id: "SKU_12345",
                            item_name: product.name,
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
                            price: product.price,
                            quantity: 1
                        }
                    ]
                }
            });
            return updatedRestaurantNames;
        });
        addToCart(productWithRestaurant);
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

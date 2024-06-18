import React, { useState } from "react";
import data from "../restaurantes.json";
import { Image } from "react-bootstrap";
import "./Restaurant.css";
import { Cabecera } from "./Cabecera";
import { useNavigate } from 'react-router-dom';

export const Resultados = ({ search }) => {
    const restaurantes = data.restaurantes || []; // Asegúrate de usar la estructura correcta del JSON
    const [sortCriteria, setSortCriteria] = useState('none');
    const navigate = useNavigate();

    const handleRestaurantClick = (restaurant) => {
        // Navegar a la página de productos del restaurante seleccionado
        navigate(`/productos/${restaurant.name}`);
    };

    const handleSortChange = (e) => {
        setSortCriteria(e.target.value);
    };

    const sortData = (data) => {
        switch (sortCriteria) {
            case 'price_asc':
                return data.sort((a, b) => a.min_price - b.min_price);
            case 'price_desc':
                return data.sort((a, b) => b.max_price - a.max_price);
            case 'time':
                return data.sort((a, b) => a.avg_time - b.avg_time);
            default:
                return data;
        }
    };

    const filteredData = sortData(restaurantes.filter(restaurante =>
        restaurante.name.toLowerCase().includes(search.toLowerCase())
    ));

    return (
        <div className="restaurante-fondo">
            <Cabecera />
            <div className="restaurants-container">
                <h2>Restaurantes:</h2>
                <div className="sort-dropdown">
                    <label htmlFor="sort">Ordenar por: </label>
                    <select id="sort" onChange={handleSortChange}>
                        <option value="none">Seleccionar</option>
                        <option value="price_asc">Precio: Más barato</option>
                        <option value="price_desc">Precio: Más caro</option>
                        <option value="time">Tiempo</option>
                    </select>
                </div>

                <div className="resultados-container">
                    {filteredData.map(item => (
                        <div className="restaurante-card" key={item.name} onClick={() => handleRestaurantClick(item)}>
                            <Image src={item.foto} className="restaurante-foto" />
                            <h2>{item.name}</h2>
                            <p>{item.location}</p>
                            <p className="restaurante-price"> {item.min_price}€ - {item.max_price}€ | ~{item.avg_time}min </p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

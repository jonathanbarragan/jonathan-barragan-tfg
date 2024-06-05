import React, {useState, useE} from "react";
import data from "../restaurantes.json";
import {Image} from "react-bootstrap";
import "./Resultados.css";
import { Productos } from "./Productos";
export const Resultados = ({search})=>{
    const restaurantes = data.restuarantes || [];
    const [selectedRestaurant, setSelectedRestaurant] = useState(null);


    const handleRestaurantClick = (restaurant) => {
      setSelectedRestaurant(restaurant);
    };


    const filteredData =restaurantes.filter(restaurante => 
        restaurante.name.toLowerCase().includes(search.toLowerCase())
    );

    return(
      <div>
        {!selectedRestaurant ? (
          <div className="resultados-container" >
            {filteredData.map(item => (
              <div className="card card-body shadow-lg" key={item.name} onClick={()=> handleRestaurantClick(item)}>
                <h2>{item.name}</h2>
                <p>{item.location}</p>
              </div>
            ))}
          </div>
        ):(
          <Productos restaurant={selectedRestaurant} onBack={() => setSelectedRestaurant(null)} />
        )}
          
      </div>
      
    )
}


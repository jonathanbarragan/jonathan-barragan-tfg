import React, {useEffect} from "react"
import { Resultados } from "./Resultados"

export const Productos = ({ restaurant, onBack }) => {

  useEffect(() => {
    const previousUrl = window.location.pathname;
    window.history.pushState(null, "", `?restaurant=${restaurant.name}`);

    return() => {
        window.history.pushState(null, "", previousUrl);
    }
},[restaurant.name]);

  return (
    <div className="productos-container">
      <button onClick={onBack}>Back</button>
      <h2>{restaurant.name}</h2>
      <p>{restaurant.location}</p>
      <h3>Products:</h3>
      <ul className="products-list">
        {restaurant.products.map(product => (
          <li className="product-item" key={product.name}>
            <p>{product.name} - {product.price} {product.currency}</p>
            <p>{product.description}</p>
          </li>
        ))}
      </ul>
    </div>
  );
};


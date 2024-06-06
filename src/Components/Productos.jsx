import React, {useEffect} from "react"
import { Resultados } from "./Resultados"
import { Button, Image } from "react-bootstrap";
import "./Productos.css"

export const Productos = ({ restaurant, onBack, addToCart }) => {

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
        <div className="products-list">
          {restaurant.products.map(product => (
            <div className="card card-body" key={product.name}>
            <div className="product-item">
              <div className="product-info">
                <Image src={product.foto} className="product-foto" />
                <p><b>{product.name} </b>- {product.price} {product.currency}</p>
                <p>{product.description}</p>
                </div>
                <Button id="add_to_cart" className="add_to_cart" variant="success" onClick={() => addToCart(product)}>Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
    </div>

  );
};


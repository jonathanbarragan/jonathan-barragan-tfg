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

  const handleAddToCart = (product) => {
        const productWithRestaurant = {
            ...product,
            restaurant: restaurant.name,
        };
        addToCart(productWithRestaurant);
    };
    window.dataLayer.push({ ecommerce: null });  // Clear the previous ecommerce object.
window.dataLayer.push({
  event: "add_to_cart",
  ecommerce: {
    currency: "USD",
    value: 30.03,
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
    }
    ]
  }
});
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
                <Button id="add_to_cart" className="add_to_cart" variant="success" onClick={() => handleAddToCart(product)}>Add to Cart</Button>
              </div>
            </div>
          ))}
        </div>
    </div>

  );
};


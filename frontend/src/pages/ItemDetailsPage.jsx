import { useContext, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import menuData from "../data/menuData";
import { CartContext } from "../context/CartContext";
import "./ItemDetailsPage.css";

function ItemDetailsPage() {
  const { id } = useParams();

  const item = menuData.find((food) => food.id === Number(id));

  const [quantity, setQuantity] = useState(1);
  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

const handleAddToCart = () => {
  addToCart(item, quantity);
 
  navigate("/orders");
};

  if (!item) {
    return <h2>Food Item Not Found</h2>;
  }

  return (
    <div className="details-container">

      <div className="details-card">

        <img src={item.image} alt={item.name} />

        <h1>{item.name}</h1>

        <p>{item.description}</p>

        <h2>₹ {item.price}</h2>

        <div className="quantity">

          <button
            onClick={() =>
              quantity > 1 && setQuantity(quantity - 1)
            }
          >
            -
          </button>

          <span>{quantity}</span>

          <button
            onClick={() =>
              setQuantity(quantity + 1)
            }
          >
            +
          </button>

        </div>
          <button
              className="cart-btn"
                onClick={handleAddToCart}>
                         Add To Cart
          </button>

      </div>

    </div>
  );
}

export default ItemDetailsPage;
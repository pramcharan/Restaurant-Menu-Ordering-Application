import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import { CartContext } from "../context/CartContext";
import { imageMap } from "../utils/imageMap";
import "./ItemDetailsPage.css";

function ItemDetailsPage() {
  const { id } = useParams();

  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);

  const { addToCart } = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      try {
        const res = await axios.get(
          `http://localhost:5000/api/menu/${id}`
        );

        setItem(res.data.data);
      } catch (err) {
        console.log(err);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(item, quantity);
    navigate("/orders");
  };

  if (!item) return <h2>Loading...</h2>;

  return (
    <div className="details-container">
      <div className="details-card">

        <img
          src={imageMap[item.imageUrl]}
          alt={item.name}
        />

        <h1>{item.name}</h1>

        <p>{item.description}</p>

        <h2>₹{item.price}</h2>

        <div className="quantity">
          <button onClick={() => quantity > 1 && setQuantity(quantity - 1)}>
            -
          </button>

          <span>{quantity}</span>

          <button onClick={() => setQuantity(quantity + 1)}>
            +
          </button>
        </div>

        <button
          className="cart-btn"
          onClick={handleAddToCart}
        >
          Add To Cart
        </button>

      </div>
    </div>
  );
}

export default ItemDetailsPage;
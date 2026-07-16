import { useContext, useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { getMenuItemById } from "../services/api";
import { CartContext } from "../context/CartContext";
import { imageMap } from "../utils/imageMap";
import "./ItemDetailsPage.css";

function ItemDetailsPage(){
  const {id} = useParams();

  const [item, setItem] = useState(null);
  const [quantity, setQuantity] = useState(1);
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  const {addToCart} = useContext(CartContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchItem = async () => {
      setLoading(true);
      setErrorMsg("");
      try{
        const res = await getMenuItemById(id);
        setItem(res.data.data);
      }catch(err){
        console.error("Failed to fetch menu item:", err);
        setErrorMsg("Item not found or failed to load.");
      }finally{
        setLoading(false);
      }
    };

    fetchItem();
  }, [id]);

  const handleAddToCart = () => {
    addToCart(item, quantity);
    navigate("/orders");
  };

  if(loading){
    return <h2>Loading...</h2>;
  }

  if(errorMsg){
    return <h2>{errorMsg}</h2>;
  }

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
        <div className="details-actions">
          <button
            className="cart-btn"
            onClick={handleAddToCart}
          >
            Add To Cart
          </button>
          <button
            className="back-btn"
            onClick={() => navigate("/menu")}
          >
            Back to Menu
          </button>
        </div>
      </div>
    </div>
  );
}

export default ItemDetailsPage;
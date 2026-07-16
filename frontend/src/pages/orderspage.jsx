import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import { CartContext } from "../context/CartContext";
import "./OrdersPage.css";
import axios from "axios";
import { imageMap } from "../utils/imageMap";


function OrdersPage() {
  const {
  cart,
  removeFromCart,
  clearCart,
  increaseQuantity,
  decreaseQuantity,
} = useContext(CartContext);

  const navigate = useNavigate();

  const grandTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity,
    0
  );

  const placeOrder = async () => {
const sessionId = localStorage.getItem("sessionId");
const tableNumber = localStorage.getItem("tableNumber");

const orderData = {
  tableNumber,
  sessionId,
  items: cart.map((item) => ({
    menuItemId: item._id,
    quantity: item.quantity,
  })),
};

  try {

   const response = await axios.post(
   "http://localhost:5000/api/orders",
   orderData
);

clearCart();

navigate(`/kitchen/${response.data.data._id}`);

  } catch (error) {
  console.log(error.response?.data);
  console.log(error.response?.status);
  console.log(error);

  alert(
    error.response?.data?.message || "Order Failed"
  );
}
};

  return (
   <div className="orders-container">
    <h1 className="orders-title">🛒 Your Orders</h1>

      {cart.length === 0 ? (
      <h3 className="empty-cart">Your Cart is Empty</h3>
      ) : (
        <>
          {cart.map((item) => (
          <div key={item._id} className="order-card">
            
             <img
              src={imageMap[item.imageUrl]}
              alt={item.name}
              width="150"
             />
           <div className="order-details">
             <h2>{item.name}</h2>
             <p>Price : ₹{item.price}</p>
            <div className="quantity-box">

            <button
              className="qty-btn"
             onClick={() => decreaseQuantity(item._id)} >
                  -       </button>

           <span>{item.quantity}</span>

            <button
             className="qty-btn"
             onClick={() => increaseQuantity(item._id)}>
                     +
              </button>

            </div>
            <p>Total : ₹{item.price * item.quantity}</p>
             <button
               className="remove-btn"
               onClick={() => removeFromCart(item._id)} >Remove Item
              </button>

            </div>
            </div>
          ))}

         <div className="total-section">
          <h2>Grand Total : ₹{grandTotal}</h2>

          <button 
              className="shopping-btn"
          onClick={() => navigate("/menu")}>
            Continue Order
          </button>

          <button 
           className="place-btn"
          onClick={placeOrder}>
            Place Order
          </button>
          </div>
        </>
      )}
    </div>
  );
}

export default OrdersPage;
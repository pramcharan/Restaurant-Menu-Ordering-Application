import { useContext, useState } from "react";
import { useNavigate } from "react-router-dom";
import { FaShoppingCart, FaArrowLeft } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import "./orderspage.css";
import { placeOrder } from "../services/api";
import { imageMap } from "../utils/imageMap";

function OrdersPage(){
  const {
    cart,
    removeFromCart,
    clearCart,
    increaseQuantity,
    decreaseQuantity,
  } = useContext(CartContext);

  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [errorMsg, setErrorMsg] = useState("");

  const grandTotal = cart.reduce(
    (total, item) => total + item.price * item.quantity, 0
  );

  const handlePlaceOrder = async () => {
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

    setErrorMsg("");
    setLoading(true);

    try{
      const response = await placeOrder(orderData);

      clearCart();
      localStorage.setItem("lastOrderId", response.data.data._id);
      navigate(`/order-status/${response.data.data._id}`);
    }catch(error){
      console.error("Order failed:", error);
      setErrorMsg(
        error.response?.data?.error || "Order failed. Please try again."
      );
    }finally{
      setLoading(false);
    }
  };

  return(
    <div className="orders-container">
      <h1 className="orders-title" style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "12px" }}>
        <FaShoppingCart /> Your Orders
      </h1>

      {errorMsg && (
        <p style={{ color: "red", textAlign: "center", marginBottom: "12px" }}>
          {errorMsg}
        </p>
      )}

      {cart.length === 0 ? (
        <div className="empty-cart-container">
          <h3 className="empty-cart">Your Cart is Empty</h3>
          <button
            className="empty-cart-btn"
            onClick={() => navigate("/menu")}
          >
            <FaArrowLeft /> Go back to Menu
          </button>
        </div>
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
                    onClick={() => decreaseQuantity(item._id)}
                  >
                    -
                  </button>

                  <span>{item.quantity}</span>

                  <button
                    className="qty-btn"
                    onClick={() => increaseQuantity(item._id)}
                  >
                    +
                  </button>
                </div>

                <p>Total : ₹{item.price * item.quantity}</p>

                <button
                  className="remove-btn"
                  onClick={() => removeFromCart(item._id)}
                >
                  Remove Item
                </button>
              </div>

            </div>
          ))}

          <div className="total-section">
            <h2>Grand Total : ₹{grandTotal}</h2>

            <button
              className="shopping-btn"
              onClick={() => navigate("/menu")}
            >
              Continue Order
            </button>

            <button
              className="place-btn"
              onClick={handlePlaceOrder}
              disabled={loading}
            >
              {loading ? "Placing Order..." : "Place Order"}
            </button>
          </div>
        </>
      )}
    </div>
  );
}

export default OrdersPage;
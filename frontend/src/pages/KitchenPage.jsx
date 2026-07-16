import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import axios from "axios";
import "./KitchenPage.css";

function KitchenPage() {
  const { id } = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);

  // Fetch order when page loads
  useEffect(() => {
    fetchOrder();
  }, []);

  // Auto refresh every 3 seconds
  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrder();
    }, 3000);

    return () => clearInterval(interval);
  }, []);

  // Return to home after Served or Cancelled
  useEffect(() => {
    if (
      order &&
      (order.status === "Served" ||
        order.status === "Cancelled")
    ) {
      const timer = setTimeout(() => {
        navigate("/");
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, [order, navigate]);

  const fetchOrder = async () => {
    try {
      const response = await axios.get(
        `http://localhost:5000/api/orders/${id}`
      );

      setOrder(response.data.data);
    } catch (error) {
      console.log(error);
    }
  };

  const updateStatus = async (status) => {
    try {
      await axios.patch(
        `http://localhost:5000/api/orders/${id}/status`,
        {
          status,
        }
      );

      fetchOrder();
    } catch (error) {
      console.log(error);
    }
  };

  if (!order) {
    return <h2>Loading...</h2>;
  }

  return (
    <div className="kitchen-container">
      <h1>🍽 Kitchen Dashboard</h1>

      <div className="kitchen-card">

        {/* Left Side */}
        <div className="order-section">
          <h2>Table Number : {order.tableNumber}</h2>

          <p>
            <b>Payment Status :</b> Pending
          </p>

          <div className="items-list">
            <h3>Ordered Items</h3>

            {order.items.map((item) => (
              <div
                key={item.menuItem}
                className="item-row"
              >
                <span>{item.name}</span>
                <span>x {item.quantity}</span>
              </div>
            ))}
          </div>

          <h2 className="total">
            Total Amount : ₹{order.totalAmount}
          </h2>
        </div>

        {/* Right Side */}
        <div className="status-section">

          <div className="status-box">
            <h3>Current Order Status</h3>
            <h2>{order.status}</h2>
          </div>

          <div className="button-group">

            {order.status === "Pending" && (
              <button
                className="status-btn"
                onClick={() =>
                  updateStatus("Preparing")
                }
              >
                Start Preparing
              </button>
            )}

            {order.status === "Preparing" && (
              <>
                <button
                  className="status-btn"
                  onClick={() =>
                    updateStatus("Served")
                  }
                >
                  Mark as Served
                </button>

                <button
                  className="cancel-btn"
                  onClick={() =>
                    updateStatus("Cancelled")
                  }
                >
                  Cancel Order
                </button>
              </>
            )}

            {order.status === "Served" && (
              <>
                <h3 style={{ color: "lightgreen" }}>
                  ✅ Order Served Successfully
                </h3>

                <p style={{ color: "white" }}>
                  Returning to Home Page in 3
                  seconds...
                </p>
              </>
            )}

            {order.status === "Cancelled" && (
              <>
                <h3 style={{ color: "red" }}>
                  ❌ Order Cancelled
                </h3>

                <p style={{ color: "white" }}>
                  Returning to Home Page in 3
                  seconds...
                </p>
              </>
            )}

          </div>

        </div>

      </div>
    </div>
  );
}

export default KitchenPage;
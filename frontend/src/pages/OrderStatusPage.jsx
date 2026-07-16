import { useEffect, useState, useCallback } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { MdReceiptLong, MdCancel, MdCheckCircle } from "react-icons/md";
import { getOrderById, updateOrderStatus } from "../services/api";
import { showAlert, showConfirm } from "../utils/swal";
import "./OrderStatusPage.css";

function OrderStatusPage(){
  const {id} = useParams();
  const navigate = useNavigate();

  const [order, setOrder] = useState(null);
  const [errorMsg, setErrorMsg] = useState("");
  const [cancelling, setCancelling] = useState(false);

  const fetchOrder = useCallback(async () => {
    try{
      const response = await getOrderById(id);
      setOrder(response.data.data);
    }catch(error){
      console.error("Failed to fetch order status:", error);
      setErrorMsg("Failed to load order status details.");
    }
  }, [id]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  useEffect(() => {
    const status = order?.status;
    if(status === "Served" || status === "Cancelled"){
      return;
    }
    const interval = setInterval(() => {
      fetchOrder();
    }, 3000);

    return () => clearInterval(interval);
  }, [fetchOrder, order?.status]);

  useEffect(() => {
    const status = order?.status;
    if(status === "Served" || status === "Cancelled"){
      const timer = setTimeout(() => {
        localStorage.removeItem("lastOrderId");
        navigate("/menu");
      }, 5000);

      return () => clearTimeout(timer);
    }
  }, [order?.status, navigate]);

  const handleCancelOrder = async () => {
    const confirmed = await showConfirm("Cancel Order", "Are you sure you want to cancel this order?");
    if(!confirmed){
      return;
    }

    setCancelling(true);
    try{
      await updateOrderStatus(id, "Cancelled");
      fetchOrder();
      showAlert("Order Cancelled", "Your order was successfully cancelled.", "success");
    }catch(error){
      console.error("Failed to cancel order:", error);
      showAlert("Cancellation Failed", error.response?.data?.error || "Failed to cancel order", "error");
    }finally{
      setCancelling(false);
    }
  };

  const getStepClass = (stepName) => {
    if(!order){
      return "";
    }
    const statuses = ["Pending", "Preparing", "Served"];
    const currentIdx = statuses.indexOf(order.status);
    const stepIdx = statuses.indexOf(stepName);

    if(order.status === "Cancelled"){
      return "step-cancelled";
    }
    if(currentIdx >= stepIdx){
      return "step-completed";
    }
    return "step-upcoming";
  };

  if(errorMsg){
    return <h2 className="status-error-text">{errorMsg}</h2>;
  }
  if(!order){
    return <h2 className="status-loading-text">Loading status...</h2>;
  }

  return (
    <div className="status-page-container">
      <div className="status-card">
        <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <MdReceiptLong /> Order Tracking
        </h1>
        <h3>Order ID: #{order._id.substring(order._id.length - 6).toUpperCase()}</h3>
        <p className="table-badge">Table {order.tableNumber}</p>

        {order.status !== "Cancelled" ? (
          <div className="status-steps">
            <div className={`step-item ${getStepClass("Pending")}`}>
              <div className="step-number">1</div>
              <div className="step-label">Pending</div>
            </div>
            <div className="step-connector"></div>
            <div className={`step-item ${getStepClass("Preparing")}`}>
              <div className="step-number">2</div>
              <div className="step-label">Preparing</div>
            </div>
            <div className="step-connector"></div>
            <div className={`step-item ${getStepClass("Served")}`}>
              <div className="step-number">3</div>
              <div className="step-label">Served</div>
            </div>
          </div>
        ) : (
          <div className="cancelled-banner">
            <h2 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "8px" }}>
              <MdCancel /> Order Cancelled
            </h2>
            <p>Your order has been cancelled successfully.</p>
          </div>
        )}

        <div className="status-message">
          {order.status === "Pending" && (
            <p>Waiting for kitchen approval. You can still cancel this order.</p>
          )}
          {order.status === "Preparing" && (
            <p>The kitchen is now preparing your delicious meal!</p>
          )}
          {order.status === "Served" && (
            <p className="success-text" style={{ display: "flex", alignItems: "center", gap: "6px" }}>
              <MdCheckCircle /> Served! Enjoy your food. Redirecting to menu in 5 seconds...
            </p>
          )}
          {order.status === "Cancelled" && (
            <p className="danger-text">Redirecting to menu in 5 seconds...</p>
          )}
        </div>

        <div className="order-summary-box">
          <h4>Items Ordered</h4>
          <div className="summary-items">
            {order.items.map((item, idx) => (
              <div key={idx} className="summary-row">
                <span>{item.name} x{item.quantity}</span>
                <span>₹{item.price * item.quantity}</span>
              </div>
            ))}
          </div>
          <div className="summary-total">
            <span>Total Paid/Pending</span>
            <span>₹{order.totalAmount}</span>
          </div>
        </div>

        {order.status === "Pending" && (
          <button
            className="cancel-order-btn"
            onClick={handleCancelOrder}
            disabled={cancelling}
          >
            {cancelling ? "Cancelling..." : "Cancel Order"}
          </button>
        )}

        {order.status === "Preparing" && (
          <p className="lock-message">
            🔒 Order is in prep stage and cannot be cancelled.
          </p>
        )}

        <button className="back-menu-btn" onClick={() => navigate("/menu")}>
          Back to Menu
        </button>
      </div>
    </div>
  );
}

export default OrderStatusPage;

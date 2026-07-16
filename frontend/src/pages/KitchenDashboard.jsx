import { useEffect, useState, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import { MdKitchen, MdRefresh, MdExitToApp } from "react-icons/md";
import { getAllOrders, updateOrderStatus } from "../services/api";
import { showAlert } from "../utils/swal";
import "./KitchenDashboard.css";

function KitchenDashboard() {
  const [orders, setOrders] = useState([]);
  const [filter, setFilter] = useState("Active");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const fetchOrders = useCallback(async () => {
    try{
      const statusParam = (filter !== "Active" && filter !== "All") ? filter : undefined;
      const response = await getAllOrders(statusParam);
      
      let fetchedOrders = response.data.data;
      if(filter === "Active"){
        fetchedOrders = fetchedOrders.filter(
          (o) => o.status === "Pending" || o.status === "Preparing"
        );
      }
      setOrders(fetchedOrders);
      setErrorMsg("");
    }catch(error){
      console.error("Failed to fetch kitchen orders:", error);
      setErrorMsg("Failed to retrieve order list.");
    }finally{
      setLoading(false);
    }
  }, [filter]);

  useEffect(() => {
    fetchOrders();
  }, [fetchOrders]);

  useEffect(() => {
    const interval = setInterval(() => {
      fetchOrders();
    }, 5000);

    return () => clearInterval(interval);
  }, [fetchOrders]);

  const handleUpdateStatus = async (orderId, newStatus) => {
    try{
      await updateOrderStatus(orderId, newStatus);
      fetchOrders();
    }catch(error){
      console.error("Failed to update status for order", orderId, error);
      showAlert("Update Failed", error.response?.data?.error || "Failed to update order status", "error");
    }
  };

  const handleLogout = () => {
    sessionStorage.removeItem("kitchenAuth");
    navigate("/kitchen");
  };

  const getStatusColor = (status) => {
    switch (status){
      case "Pending":
        return "#ffd700";
      case "Preparing":
        return "#ff8c00";
      case "Served":
        return "#32cd32";
      case "Cancelled":
        return "#ff4500";
      default:
        return "#fff";
    }
  };

  return (
    <div className="kitchen-dashboard-container">
      <header className="dashboard-header">
        <h1 style={{ display: "flex", alignItems: "center", gap: "10px" }}>
          <MdKitchen /> Kitchen Control Center
        </h1>
        <div className="header-actions">
          <button className="refresh-btn" onClick={fetchOrders} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <MdRefresh size={18} /> Refresh
          </button>
          <button className="logout-btn" onClick={handleLogout} style={{ display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <MdExitToApp size={18} /> Logout
          </button>
        </div>
      </header>

      <div className="dashboard-tabs">
        {["Active", "Pending", "Preparing", "Served", "Cancelled", "All"].map((tab) => (
          <button
            key={tab}
            className={`tab-btn ${filter === tab ? "active" : ""}`}
            onClick={() => {
              setLoading(true);
              setFilter(tab);
            }}
          >
            {tab}
          </button>
        ))}
      </div>

      {loading ? (
        <h2 className="loading-text">Loading orders...</h2>
      ) : errorMsg ? (
        <h2 className="error-text" style={{ color: "#ff6b6b", textAlign: "center" }}>{errorMsg}</h2>
      ) : orders.length === 0 ? (
        <div className="no-orders">
          <h3>No {filter !== "All" && filter !== "Active" ? filter.toLowerCase() : ""} orders found.</h3>
        </div>
      ) : (
        <div className="orders-grid">
          {orders.map((order) => (
            <div key={order._id} className="order-card" style={{ borderColor: getStatusColor(order.status) }}>
              <div className="card-header">
                <h3>Table {order.tableNumber}</h3>
                <span className="order-time">
                  {new Date(order.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })}
                </span>
              </div>

              <div className="card-status-badge" style={{ color: getStatusColor(order.status) }}>
                ● {order.status}
              </div>

              <div className="card-items">
                {order.items.map((item, idx) => (
                  <div key={idx} className="item-row">
                    <span className="item-name">{item.name}</span>
                    <span className="item-qty">x {item.quantity}</span>
                  </div>
                ))}
              </div>

              <div className="card-footer">
                <div className="card-total">Total: ₹{order.totalAmount}</div>
                <div className="card-actions">
                  {order.status === "Pending" && (
                    <button
                      className="prep-btn"
                      onClick={() => handleUpdateStatus(order._id, "Preparing")}
                    >
                      Start Cooking
                    </button>
                  )}

                  {order.status === "Preparing" && (
                    <>
                      <button
                        className="serve-btn"
                        onClick={() => handleUpdateStatus(order._id, "Served")}
                      >
                        Serve Order
                      </button>
                      <button
                        className="cancel-btn"
                        onClick={() => handleUpdateStatus(order._id, "Cancelled")}
                      >
                        Cancel
                      </button>
                    </>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}

export default KitchenDashboard;
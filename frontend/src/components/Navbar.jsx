import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart, FaUtensils } from "react-icons/fa";
import { MdTableRestaurant, MdReceiptLong } from "react-icons/md";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const tableNumber = localStorage.getItem("tableNumber");
  const lastOrderId = localStorage.getItem("lastOrderId");

  return (
    <nav className="navbar">
      <h1 className="logo" style={{ display: "flex", alignItems: "center", gap: "10px" }}>
        <FaUtensils size={24} /> Luxe Bistro
      </h1>

      <div className="nav-right">
        <div className="table-info">
          <MdTableRestaurant className="table-icon" />
          <span>Table {tableNumber}</span>
        </div>

        {lastOrderId && (
          <Link to={`/order-status/${lastOrderId}`} className="track-order-link">
            <MdReceiptLong size={24} className="track-icon" />
            <span>Track Order</span>
          </Link>
        )}

        <Link to="/orders" className="cart-link">
          <FaShoppingCart size={28} />
          <span className="cart-count">{totalItems}</span>
        </Link>
      </div>
    </nav>
  );
}

export default Navbar;
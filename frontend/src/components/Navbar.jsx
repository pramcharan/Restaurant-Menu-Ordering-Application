import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { MdTableRestaurant } from "react-icons/md";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  const tableNumber = localStorage.getItem("tableNumber");

  return (
    <nav className="navbar">

      {/* Logo */}
      <h1 className="logo">🍽 Luxe Bistro</h1>

      {/* Right Side */}
      <div className="nav-right">

        {/* Table Number */}
        <div className="table-info">
          <MdTableRestaurant className="table-icon" />
          <span>Table {tableNumber}</span>
        </div>

        {/* Cart */}
        <Link to="/orders" className="cart-link">
          <FaShoppingCart size={28} />
          <span className="cart-count">{totalItems}</span>
        </Link>

      </div>

    </nav>
  );
}

export default Navbar;
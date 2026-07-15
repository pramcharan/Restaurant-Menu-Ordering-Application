import { useContext } from "react";
import { Link } from "react-router-dom";
import { FaShoppingCart } from "react-icons/fa";
import { CartContext } from "../context/CartContext";
import "./Navbar.css";

function Navbar() {
  const { cart } = useContext(CartContext);

  const totalItems = cart.reduce(
    (total, item) => total + item.quantity,
    0
  );

  return (
    <nav className="navbar">

      <h1 className="logo">🍽 Luxe Bistro</h1>

      <Link to="/orders" className="cart-link">
        <FaShoppingCart size={28} />
        <span className="cart-count">{totalItems}</span>
      </Link>

    </nav>
  );
}

export default Navbar;
import { Link } from "react-router-dom";

function MenuCard({ item }) {
  return (
    <div className="card">
      <img src={item.image} alt={item.name} />

      <h3>{item.name}</h3>

      <p>{item.description}</p>

      <h2>₹{item.price}</h2>

      <Link to={`/item/${item.id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default MenuCard;
import { Link } from "react-router-dom";
import { imageMap } from "../utils/imageMap";
function MenuCard({ item }) {
  return (
    <div className="card">
   <img
  src={imageMap[item.imageUrl]}
  alt={item.name}
/>
      <h3>{item.name}</h3>

      <p>{item.description}</p>

      <h2>₹{item.price}</h2>

     <Link to={`/item/${item._id}`}>
        <button>View Details</button>
      </Link>
    </div>
  );
}

export default MenuCard;
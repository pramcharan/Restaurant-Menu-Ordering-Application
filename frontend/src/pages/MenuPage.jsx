import { useState, useEffect } from "react";
import axios from "axios";
import MenuCard from "../components/MenuCard";
import "./MenuPage.css";
import Navbar from "../components/Navbar";

function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      try {
        const response = await axios.get(
          "http://localhost:5000/api/menu"
        );

        setMenu(response.data.data);
      } catch (error) {
        console.error(error);
      }
    };

    fetchMenu();
  }, []);

  const filteredItems = menu.filter((item) => {
    const matchCategory =
      category === "All" || item.category === category;

    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <>
      <Navbar />

      <div className="menu-container">

        <input
          className="search-box"
          type="text"
          placeholder="Search Food..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
<div className="categories">
  <button onClick={() => setCategory("All")}>All</button>
  <button onClick={() => setCategory("Food")}>Food</button>
  <button onClick={() => setCategory("Drink")}>Drink</button>
  <button onClick={() => setCategory("Dessert")}>Dessert</button>
</div>
        <div className="card-grid">
          {filteredItems.map((item) => (
            <MenuCard key={item._id} item={item} />
          ))}
        </div>

      </div>
    </>
  );
}

export default MenuPage;
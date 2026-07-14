import { useState } from "react";
import MenuCard from "../components/MenuCard";
import menuData from "../data/menuData";
import "./MenuPage.css";

function MenuPage() {
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");

  const filteredItems = menuData.filter((item) => {
    const matchCategory =
      category === "All" || item.category === category;

    const matchSearch = item.name
      .toLowerCase()
      .includes(search.toLowerCase());

    return matchCategory && matchSearch;
  });

  return (
    <div className="menu-container">

      <h1>🍽 Luxe Bistro</h1>

      <input
        className="search-box"
        type="text"
        placeholder="Search Food..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
      />

      <div className="categories">
        <button onClick={() => setCategory("All")}>All</button>
        <button onClick={() => setCategory("Starters")}>Starters</button>
        <button onClick={() => setCategory("Main Course")}>Main Course</button>
        <button onClick={() => setCategory("Beverages")}>Beverages</button>
        <button onClick={() => setCategory("Desserts")}>Desserts</button>
      </div>

      <div className="card-grid">
        {filteredItems.map((item) => (
          <MenuCard key={item.id} item={item} />
        ))}
      </div>

    </div>
  );
}

export default MenuPage;
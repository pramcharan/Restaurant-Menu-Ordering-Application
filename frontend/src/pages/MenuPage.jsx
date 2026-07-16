import { useState, useEffect } from "react";
import { getMenuItems } from "../services/api";
import MenuCard from "../components/MenuCard";
import "./MenuPage.css";
import Navbar from "../components/Navbar";

function MenuPage() {
  const [menu, setMenu] = useState([]);
  const [category, setCategory] = useState("All");
  const [search, setSearch] = useState("");
  const [loading, setLoading] = useState(true);
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    const fetchMenu = async () => {
      setLoading(true);
      setErrorMsg("");
      try{
        const response = await getMenuItems();
        setMenu(response.data.data);
      }catch(error){
        console.error("Failed to fetch menu:", error);
        setErrorMsg("Failed to load menu. Please try again.");
      }finally{
        setLoading(false);
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

  return(
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
          <button onClick={() => setCategory("Other")}>Other</button>
        </div>

        {loading && <p className="status-msg">Loading menu...</p>}

        {errorMsg && <p className="status-msg error-text">{errorMsg}</p>}

        {!loading && !errorMsg && filteredItems.length === 0 && (
          <p className="status-msg">No items found.</p>
        )}

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
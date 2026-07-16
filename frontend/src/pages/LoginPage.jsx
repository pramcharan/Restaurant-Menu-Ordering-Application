import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { FaUtensils } from "react-icons/fa";
import { MdKitchen } from "react-icons/md";
import { showAlert } from "../utils/swal";
import "./LoginPage.css";

function LoginPage(){
  const [tableNo, setTableNo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if(tableNo === ""){
      showAlert("Table Required", "Please enter a valid table number to proceed.", "warning");
      return;
    }

    localStorage.setItem("tableNumber", tableNo);
    navigate("/table-session");
  };

  return(
    <div className="login-container">
      <div className="login-box">

        <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <FaUtensils style={{ fontSize: "28px" }} /> Luxe Bistro
        </h1>

        <h3>Digital Menu &amp; Table Ordering</h3>

        <p>Welcome! Enter your table number to continue.</p>

        <input
          type="number"
          placeholder="Enter Table Number"
          value={tableNo}
          onChange={(e) => setTableNo(e.target.value)}
        />

        <button onClick={handleSubmit}>
          View Menu
        </button>

        <div style={{ marginTop: "25px" }}>
          <Link to="/kitchen" style={{ color: "#D4AF37", fontSize: "14px", textDecoration: "underline", display: "inline-flex", alignItems: "center", gap: "6px" }}>
            <MdKitchen size={18} /> Kitchen Staff Portal
          </Link>
        </div>

      </div>
    </div>
  );
}

export default LoginPage;
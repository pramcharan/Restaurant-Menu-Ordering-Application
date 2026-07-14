import { useState } from "react";
import { useNavigate } from "react-router-dom";
import "./LoginPage.css";

function LoginPage() {
  const [tableNo, setTableNo] = useState("");
  const navigate = useNavigate();

  const handleSubmit = () => {
    if (tableNo === "") {
      alert("Please enter table number");
      return;
    }

    localStorage.setItem("tableNo", tableNo);
    navigate("/menu");
  };

  return (
    <div className="login-container">
      <div className="login-box">

        <h1>🍽 Luxe Bistro</h1>

        <h3>Digital Menu & Table Ordering</h3>

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

      </div>
    </div>
  );
}

export default LoginPage;
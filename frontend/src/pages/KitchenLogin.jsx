import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { MdKitchen } from "react-icons/md";
import "./KitchenLogin.css";

function KitchenLogin() {
  const [pin, setPin] = useState("");
  const [errorMsg, setErrorMsg] = useState("");
  const navigate = useNavigate();

  const handleLogin = (e) => {
    e.preventDefault();
    const correctPin = import.meta.env.VITE_KITCHEN_PIN || "1234";

    if (pin === correctPin) {
      sessionStorage.setItem("kitchenAuth", "true");
      navigate("/kitchen/dashboard");
    } else {
      setErrorMsg("Incorrect PIN. Please try again.");
      setPin("");
    }
  };

  return (
    <div className="kitchen-login-container">
      <div className="kitchen-login-box">
        <h1 style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: "10px" }}>
          <MdKitchen /> Kitchen Staff Login
        </h1>
        <p>Please enter the 4-digit security PIN to access the kitchen dashboard.</p>

        {errorMsg && (
          <p className="error-msg" style={{ color: "#ff6b6b", marginBottom: "15px" }}>
            {errorMsg}
          </p>
        )}

        <form onSubmit={handleLogin}>
          <input
            type="password"
            maxLength="4"
            placeholder="••••"
            value={pin}
            onChange={(e) => {
              setErrorMsg("");
              setPin(e.target.value.replace(/\D/g, ""));
            }}
            required
            autoFocus
          />
          <button type="submit">Access Dashboard</button>
        </form>
      </div>
    </div>
  );
}

export default KitchenLogin;

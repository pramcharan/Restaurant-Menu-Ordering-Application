import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import "./TableSession.css";

function TableSession() {
  const [tableNumber, setTableNumber] = useState("");
  const [customerName, setCustomerName] = useState("");
  const [phoneNumber, setPhoneNumber] = useState("");

  const navigate = useNavigate();

  const createSession = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post(
        "http://localhost:5000/api/table/session",
        {
          tableNumber,
          customerName,
          phoneNumber,
        }
      );

      const session = response.data.data;

      localStorage.setItem("sessionId", session.sessionId);
      localStorage.setItem("tableNumber", session.tableNumber);

      alert("Table Session Created Successfully!");

      navigate("/menu");
    } catch (error) {
      console.error(error);
      alert(
        error.response?.data?.message ||
        "Failed to create table session"
      );
    }
  };

  return (
    <div className="session-container">
      <div className="session-card">

        <h1>🍽 Luxe Bistro</h1>

        <h3>Digital Menu & Table Ordering</h3>

        <p>Enter your table details to begin ordering.</p>

        <form onSubmit={createSession}>

          <input
            type="text"
            placeholder="Enter Table Number"
            value={tableNumber}
            onChange={(e) => setTableNumber(e.target.value)}
            required
          />

          <input
            type="text"
            placeholder="Customer Name (Optional)"
            value={customerName}
            onChange={(e) => setCustomerName(e.target.value)}
          />

          <input
            type="text"
            placeholder="Phone Number (Optional)"
            value={phoneNumber}
            onChange={(e) => setPhoneNumber(e.target.value)}
          />

          <button className="start-btn" type="submit">
            Start Ordering
          </button>

        </form>

      </div>
    </div>
  );
}

export default TableSession;
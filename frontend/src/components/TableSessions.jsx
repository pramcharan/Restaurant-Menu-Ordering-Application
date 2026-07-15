import { useState } from "react";
import { useNavigate } from "react-router-dom";
import axios from "axios";

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

      alert("Session Created Successfully!");

      navigate("/menu");
    } catch (error) {
      console.error(error);
      alert(error.response?.data?.message || "Failed to create session");
    }
  };

  return (
    <div>
      <h2>Start Your Order</h2>

      <form onSubmit={createSession}>
        <input
          type="text"
          placeholder="Table Number"
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

        <button type="submit">Start Ordering</button>
      </form>
    </div>
  );
}

export default TableSession;
import axios from "axios";

export const createSession = async (tableNumber) => {
  const response = await axios.post(
    "http://localhost:5000/api/table/session",
    {
      tableNumber,
    }
  );

  return response.data.data;
};
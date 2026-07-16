import { createTableSession } from "./api";

export const createSession = async (tableNumber) => {
  const response = await createTableSession({ tableNumber });
  return response.data.data;
};
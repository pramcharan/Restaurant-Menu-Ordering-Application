import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000",
  headers: { "Content-Type": "application/json" },
});

export const getMenuItems = (category) =>
  api.get("/api/menu", { params: category ? { category } : {} });

export const getMenuItemById = (id) => api.get(`/api/menu/${id}`);

export const createMenuItem = (data) => api.post("/api/menu", data);

export const updateMenuItem = (id, data) => api.put(`/api/menu/${id}`, data);

export const deleteMenuItem = (id) => api.delete(`/api/menu/${id}`);

export const placeOrder = (orderData) => api.post("/api/orders", orderData);

export const getOrderById = (id) => api.get(`/api/orders/${id}`);

export const getOrdersByTable = (tableNumber) =>
  api.get(`/api/orders/table/${tableNumber}`);


export const getAllOrders = (status) =>
  api.get("/api/orders", { params: status ? { status } : {} });


export const updateOrderStatus = (id, status) =>
  api.patch(`/api/orders/${id}/status`, { status });

export const createTableSession = (data) => api.post("/api/table/session", data);

export const getTableSession = (sessionId) =>
  api.get(`/api/table/session/${sessionId}`);

export const closeTableSession = (sessionId) =>
  api.patch(`/api/table/session/${sessionId}/close`);

export default api;

import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TableSession from "./pages/TableSession";
import MenuPage from "./pages/MenuPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import OrdersPage from "./pages/OrdersPage";

import KitchenPage from "./pages/KitchenPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/table-session" element={<TableSession />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/item/:id" element={<ItemDetailsPage />} />
      <Route path="/orders" element={<OrdersPage />} />

      <Route path="/kitchen/:id" element={<KitchenPage />} />
    </Routes>
  );
}

export default App;
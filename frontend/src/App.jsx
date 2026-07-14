import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import MenuPage from "./pages/MenuPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";

function App() {
  return (
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/menu" element={<MenuPage />} />
      <Route path="/item/:id" element={<ItemDetailsPage />} />
    </Routes>
  );
}

export default App;
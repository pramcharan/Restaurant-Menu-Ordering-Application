import { Routes, Route } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import TableSession from "./pages/TableSession";
import MenuPage from "./pages/MenuPage";
import ItemDetailsPage from "./pages/ItemDetailsPage";
import OrdersPage from "./pages/OrdersPage";
import OrderStatusPage from "./pages/OrderStatusPage";
import KitchenLogin from "./pages/KitchenLogin";
import KitchenDashboard from "./pages/KitchenDashboard";
import ProtectedRoute from "./components/ProtectedRoute";
import KitchenRoute from "./components/KitchenRoute";

function App(){
  return(
    <Routes>
      <Route path="/" element={<LoginPage />} />
      <Route path="/table-session" element={<TableSession />} />

      <Route path="/kitchen" element={<KitchenLogin />} />

      <Route
        path="/menu"
        element={
          <ProtectedRoute>
            <MenuPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/item/:id"
        element={
          <ProtectedRoute>
            <ItemDetailsPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/orders"
        element={
          <ProtectedRoute>
            <OrdersPage />
          </ProtectedRoute>
        }
      />
      <Route
        path="/order-status/:id"
        element={
          <ProtectedRoute>
            <OrderStatusPage />
          </ProtectedRoute>
        }
      />

      <Route
        path="/kitchen/dashboard"
        element={
          <KitchenRoute>
            <KitchenDashboard />
          </KitchenRoute>
        }
      />
    </Routes>
  );
}

export default App;
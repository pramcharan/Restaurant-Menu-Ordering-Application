import { Navigate } from "react-router-dom";

function KitchenRoute({ children }){
  const isKitchenAuthed = sessionStorage.getItem("kitchenAuth") === "true";

  if(!isKitchenAuthed){
    return <Navigate to="/kitchen" replace />;
  }
  return children;
}

export default KitchenRoute;

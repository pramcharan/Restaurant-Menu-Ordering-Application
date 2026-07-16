import {Navigate} from "react-router-dom";

function ProtectedRoute({children}){
  const sessionId = localStorage.getItem("sessionId");

  if(!sessionId){
    return <Navigate to="/" replace />;
  }
  return children;
}

export default ProtectedRoute;
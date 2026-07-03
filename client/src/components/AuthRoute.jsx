import { Navigate } from "react-router-dom";

function AuthRoute({ isAuthenticated, loading, children }) {
  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  return children;
}

export default AuthRoute;

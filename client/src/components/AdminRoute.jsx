import { Navigate } from "react-router-dom";

function AdminRoute({ isAuthenticated, isAdmin, loading, children }) {
  if (loading) {
    return null;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  if (!isAdmin) {
    return <Navigate to="/access-denied" replace />;
  }

  return children;
}

export default AdminRoute;

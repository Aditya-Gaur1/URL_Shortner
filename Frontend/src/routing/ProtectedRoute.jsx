import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/useAuth";

const ProtectedRoute = () => {
  const { isAuthenticated, loading } = useAuth();

  // Don't redirect while we're checking the session
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-100">
        <p className="text-gray-500 text-lg">
          Checking authentication...
        </p>
      </div>
    );
  }

  // Not logged in → login page
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }

  // Logged in → render requested page
  return <Outlet />;
};

export default ProtectedRoute;
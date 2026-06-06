import { Navigate } from "react-router-dom";

function ProtectedRoute({
  children,
  allowedRoles,
}) {
  const token =
    localStorage.getItem("token");

  const role =
    localStorage.getItem("role");

  // Not Logged In
  if (!token) {
    return <Navigate to="/" />;
  }

  // Role Check
  if (
    allowedRoles &&
    !allowedRoles.includes(role)
  ) {
    return (
      <Navigate to="/dashboard" />
    );
  }

  return children;
}

export default ProtectedRoute;
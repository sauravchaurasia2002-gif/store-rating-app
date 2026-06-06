import {
  BrowserRouter,
  Routes,
  Route,
} from "react-router-dom";

import ProtectedRoute from "./routes/ProtectedRoute";

import Login from "./pages/Login";
import Register from "./pages/Register";
import Dashboard from "./pages/Dashboard";
import Stores from "./pages/Stores";
import AdminDashboard from "./pages/AdminDashboard";
import Users from "./pages/Users";
import OwnerDashboard from "./pages/OwnerDashboard";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Public Routes */}

        <Route
          path="/"
          element={<Login />}
        />

        <Route
          path="/register"
          element={<Register />}
        />

        {/* Dashboard */}

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute
              allowedRoles={[
                "admin",
                "owner",
                "user",
              ]}
            >
              <Dashboard />
            </ProtectedRoute>
          }
        />

        {/* User Routes */}

        <Route
          path="/stores"
          element={
            <ProtectedRoute
              allowedRoles={["user"]}
            >
              <Stores />
            </ProtectedRoute>
          }
        />

        {/* Admin Routes */}

        <Route
          path="/admin-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <AdminDashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/users"
          element={
            <ProtectedRoute
              allowedRoles={["admin"]}
            >
              <Users />
            </ProtectedRoute>
          }
        />

        {/* Owner Routes */}

        <Route
          path="/owner-dashboard"
          element={
            <ProtectedRoute
              allowedRoles={["owner"]}
            >
              <OwnerDashboard />
            </ProtectedRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
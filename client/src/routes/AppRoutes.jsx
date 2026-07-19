import { BrowserRouter, Routes, Route } from "react-router-dom";

import Signup from "../pages/auth/Signup";
import Login from "../pages/auth/Login";
import Dashboard from "../pages/dashboard/Dashboard";
import VerifyEmail from "../pages/auth/VerifyEmail";

import ProtectedRoute from "./ProtectedRoute";
import PublicRoute from "./PublicRoute";

const AppRoutes = () => {
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Dashboard />
            </ProtectedRoute>
          }
        />

        <Route
          path="/login"
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />

        <Route
          path="/signup"
          element={
            <PublicRoute>
              <Signup />
            </PublicRoute>
          }
        />
        <Route
          path="/verify-email"
          element={
            <PublicRoute>
              <VerifyEmail />
            </PublicRoute>
          }
        />
        
      </Routes>
    </BrowserRouter>
  );
};

export default AppRoutes;

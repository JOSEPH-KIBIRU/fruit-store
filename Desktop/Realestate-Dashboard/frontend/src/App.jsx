// src/App.jsx
import React, { useState, useEffect } from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Navigate,
} from "react-router-dom";

// Components
import Layout from "./components/Layout";
import ProtectedRoute from "./components/ProtectedRoute";
import AdminRoute from "./components/AdminRoute";

// Pages
import LandingPage from "./components/LandingPage";
import LoginPage from "./components/LoginPage";
import TenantFormPage from "./components/TenantFormPage";
import DashboardPage from "./components/DashboardPage";
import UnauthorizedPage from "./components/UnauthorizedPage";
import PropertyFormPage from "./components/PropertyFormPage";
import ReceivePaymentsPage from "./components/ReceivePaymentsPage";
import RentStatementPage from "./components/RentStatementPage";
import PaymentVoucherPage from "./components/PaymentVoucherPage"

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    setIsAuthenticated(!!token);
    setLoading(false);
  }, []);

  // eslint-disable-next-line no-unused-vars
  const handleLogin = (user) => {
    setIsAuthenticated(true);
  };

  const handleLogout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
    setIsAuthenticated(false);
    // Optional: redirect
    window.location.href = "/login";
  };

  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <Router>
      <Routes>
        <Route
          path="/login"
          element={
            !isAuthenticated ? (
              <LoginPage onLogin={handleLogin} />
            ) : (
              <Navigate to="/" />
            )
          }
        />

        <Route
          path="/"
          element={
            <ProtectedRoute>
              <Layout onLogout={handleLogout}>
                <LandingPage />
              </Layout>
            </ProtectedRoute>
          }
        />

        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Layout onLogout={handleLogout}>
                  <DashboardPage />
                </Layout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/voucher"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Layout onLogout={handleLogout}>
                  <PaymentVoucherPage />
                </Layout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/tenant"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Layout onLogout={handleLogout}>
                  <TenantFormPage />
                </Layout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/property"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Layout onLogout={handleLogout}>
                  <PropertyFormPage />
                </Layout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/payment"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Layout onLogout={handleLogout}>
                  <ReceivePaymentsPage/>
                </Layout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />

        <Route
          path="/statement"
          element={
            <ProtectedRoute>
              <AdminRoute>
                <Layout onLogout={handleLogout}>
                  <RentStatementPage />
                </Layout>
              </AdminRoute>
            </ProtectedRoute>
          }
        />
        <Route path="/unauthorized" element={<UnauthorizedPage />} />
        <Route path="*" element={<Navigate to="/login" />} />
      </Routes>
    </Router>
  );
}

export default App;

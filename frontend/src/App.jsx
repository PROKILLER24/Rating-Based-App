// Main App component with routing
// Location: frontend/src/App.jsx

import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { AuthProvider } from './context/AuthContext';
import { ProtectedRoute } from './hooks/useProtectedRoute';
import Layout from './components/Layout';

// Pages
import Home from './pages/Home';
import Login from './pages/Login';
import Register from './pages/Register';
import Profile from './pages/Profile';
import AdminDashboard from './pages/AdminDashboard';
import AdminUsers from './pages/AdminUsers';
import AdminStores from './pages/AdminStores';
import Stores from './pages/Stores';
import StoreDetail from './pages/StoreDetail';
import OwnerDashboard from './pages/OwnerDashboard';

function App() {
  return (
    <AuthProvider>
      <Router>
        <Layout>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            
            {/* Protected routes */}
            <Route
              path="/profile"
              element={
                <ProtectedRoute>
                  <Profile />
                </ProtectedRoute>
              }
            />
            
            {/* Admin routes */}
            <Route
              path="/admin/dashboard"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminDashboard />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/users"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminUsers />
                </ProtectedRoute>
              }
            />
            <Route
              path="/admin/stores"
              element={
                <ProtectedRoute requiredRole="ADMIN">
                  <AdminStores />
                </ProtectedRoute>
              }
            />
            
            {/* User routes */}
            <Route
              path="/stores"
              element={
                <ProtectedRoute>
                  <Stores />
                </ProtectedRoute>
              }
            />
            <Route
              path="/stores/:id"
              element={
                <ProtectedRoute>
                  <StoreDetail />
                </ProtectedRoute>
              }
            />
            
            {/* Owner routes */}
            <Route
              path="/owner/dashboard"
              element={
                <ProtectedRoute requiredRole="OWNER">
                  <OwnerDashboard />
                </ProtectedRoute>
              }
            />
            
            {/* Catch all */}
            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Layout>
      </Router>
    </AuthProvider>
  );
}

export default App;



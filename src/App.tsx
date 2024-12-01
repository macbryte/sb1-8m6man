import React from 'react';
import { Routes, Route, Navigate } from 'react-router-dom';
import { Login } from './components/Login';
import { Signup } from './components/Signup';
import { Dashboard } from './components/Dashboard';
import { AccountsPage } from './components/accounts/AccountsPage';
import { AuthRequired } from './components/AuthRequired';
import { useAuth } from './contexts/AuthContext';

function App() {
  const { currentUser } = useAuth();

  return (
    <Routes>
      <Route path="/login" element={
        currentUser ? <Navigate to="/dashboard" /> : <Login />
      } />
      <Route path="/signup" element={
        currentUser ? <Navigate to="/dashboard" /> : <Signup />
      } />
      <Route path="/dashboard" element={
        <AuthRequired>
          <Dashboard />
        </AuthRequired>
      } />
      <Route path="/accounts" element={
        <AuthRequired>
          <AccountsPage />
        </AuthRequired>
      } />
      <Route path="/" element={<Navigate to="/dashboard" />} />
    </Routes>
  );
}

export default App;
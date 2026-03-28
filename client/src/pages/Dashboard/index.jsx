import React from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/Auth';

function Dashboard() {
  const { user, token, logout } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <div className="page">
      <div className="card">
        <h1>Dashboard</h1>
        <p className="muted">Welcome back, {user?.name || 'User'}.</p>
        <div className="profile">
          <div><strong>Name:</strong> {user?.name}</div>
          <div><strong>Email:</strong> {user?.email}</div>
        </div>
        <Button type="button" onClick={logout}>Logout</Button>
      </div>
    </div>
  );
}

export default Dashboard;

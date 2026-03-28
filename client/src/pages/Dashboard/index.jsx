import React from 'react';
import { Navigate } from 'react-router-dom';
import Button from '../../components/ui/Button';
import PageShell from '../../components/ui/PageShell';
import { useAuth } from '../../context/Auth';

function Dashboard() {
  const { user, token, logout } = useAuth();

  if (!token) {
    return <Navigate to="/login" replace />;
  }

  return (
    <PageShell>
      <h1>Dashboard</h1>
      <p className="muted">Your secure space is ready.</p>
      <div className="profile">
        <div><strong>Name:</strong> {user?.name}</div>
        <div><strong>Email:</strong> {user?.email}</div>
      </div>
      <Button type="button" onClick={logout}>Logout</Button>
    </PageShell>
  );
}

export default Dashboard;

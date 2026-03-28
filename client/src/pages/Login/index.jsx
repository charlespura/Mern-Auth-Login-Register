import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/Auth';

function Login() {
  const navigate = useNavigate();
  const { login, loading } = useAuth();
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState('');

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    const result = await login({
      email: form.email,
      password: form.password
    });

    if (!result.ok) {
      setError(result.message);
      return;
    }

    navigate('/dashboard');
  };

  return (
    <div className="page">
      <div className="card">
        <h1>Welcome back</h1>
        <p className="muted">Login to continue.</p>
        <form onSubmit={onSubmit} className="form">
          <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
          />
          {error && <div className="error">{error}</div>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Checking...' : 'Login'}
          </Button>
        </form>
        <p className="muted">
          No account yet? <Link to="/register">Create one</Link>
        </p>
      </div>
    </div>
  );
}

export default Login;

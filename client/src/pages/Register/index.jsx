import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import Input from '../../components/ui/Input';
import Button from '../../components/ui/Button';
import { useAuth } from '../../context/Auth';

function Register() {
  const navigate = useNavigate();
  const { register, loading } = useAuth();
  const [form, setForm] = useState({ name: '', email: '', password: '', confirm: '' });
  const [error, setError] = useState('');

  const onChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const onSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (form.password !== form.confirm) {
      setError('Passwords do not match.');
      return;
    }

    const result = await register({
      name: form.name,
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
        <h1>Create account</h1>
        <p className="muted">Register to access your dashboard.</p>
        <form onSubmit={onSubmit} className="form">
          <Input label="Name" name="name" value={form.name} onChange={onChange} required />
          <Input label="Email" name="email" type="email" value={form.email} onChange={onChange} required />
          <Input
            label="Password"
            name="password"
            type="password"
            value={form.password}
            onChange={onChange}
            required
          />
          <Input
            label="Confirm Password"
            name="confirm"
            type="password"
            value={form.confirm}
            onChange={onChange}
            required
          />
          {error && <div className="error">{error}</div>}
          <Button type="submit" disabled={loading}>
            {loading ? 'Creating...' : 'Register'}
          </Button>
        </form>
        <p className="muted">
          Already have an account? <Link to="/login">Login</Link>
        </p>
      </div>
    </div>
  );
}

export default Register;

import React, { createContext, useContext, useMemo, useState } from 'react';
import { loginUser, registerUser } from '../../services/auth';

const AuthContext = createContext(null);

const storedToken = localStorage.getItem('token');
const storedUser = localStorage.getItem('user');

export function AuthProvider({ children }) {
  const [token, setToken] = useState(storedToken || null);
  const [user, setUser] = useState(storedUser ? JSON.parse(storedUser) : null);
  const [loading, setLoading] = useState(false);

  const persist = (nextToken, nextUser) => {
    setToken(nextToken);
    setUser(nextUser);
    localStorage.setItem('token', nextToken);
    localStorage.setItem('user', JSON.stringify(nextUser));
  };

  const clear = () => {
    setToken(null);
    setUser(null);
    localStorage.removeItem('token');
    localStorage.removeItem('user');
  };

  const register = async (payload) => {
    setLoading(true);
    try {
      const data = await registerUser(payload);
      persist(data.token, data.user);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err?.response?.data?.message || 'Register failed.' };
    } finally {
      setLoading(false);
    }
  };

  const login = async (payload) => {
    setLoading(true);
    try {
      const data = await loginUser(payload);
      persist(data.token, data.user);
      return { ok: true };
    } catch (err) {
      return { ok: false, message: err?.response?.data?.message || 'Login failed.' };
    } finally {
      setLoading(false);
    }
  };

  const logout = () => {
    clear();
  };

  const value = useMemo(
    () => ({ token, user, loading, register, login, logout }),
    [token, user, loading]
  );

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

export function useAuth() {
  return useContext(AuthContext);
}

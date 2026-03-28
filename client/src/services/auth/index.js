import axios from 'axios';

const api = axios.create({
  baseURL: 'http://localhost:5001/api'
});

export async function registerUser(payload) {
  const { data } = await api.post('/auth/register', payload);
  return data;
}

export async function loginUser(payload) {
  const { data } = await api.post('/auth/login', payload);
  return data;
}

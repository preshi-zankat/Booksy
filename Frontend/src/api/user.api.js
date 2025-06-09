import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const registerUser = (data) =>
  axios.post(`${API_BASE}/user/signup`, data);

export const loginUser = async (data) => {
  return axios.post(`${API_BASE}/user/login`, data);
};

export const getUserProfile = async () => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await axios.get(`${API_BASE}/user/profile`, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response;
}

export const updateUserProfile = async (data) => {
  const token = localStorage.getItem('token');
  if (!token) {
    throw new Error('No token found');
  }
  const response = await axios.put(`${API_BASE}/user/profile`, data, {
    headers: { Authorization: `Bearer ${token}` }
  });

  return response;
}

export const logoutUser = () => {
  localStorage.removeItem('token');
  localStorage.removeItem('user');
  return axios.post(`${API_BASE}/user/logout`);
}

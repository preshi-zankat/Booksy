import axios from 'axios';
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getBooks = async () => {
    return axios.get(`${API_BASE}/books`); 
}

export const getBookById = (id) => axios.get(`${API_BASE}/books/${id}`);

export const createBook = async (data) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
        throw new Error('No token found');
    }
    return axios.post(`${API_BASE}/books`, data, {
        headers: { Authorization: `Bearer ${token}` }, 
    });
};

export const updateBook = async (id, data) => {
    const token = localStorage.getItem('token'); 
    if (!token) {
        throw new Error('No token found');
    }
    return axios.put(`${API_BASE}/books/${id}`, data, { 
        headers: { Authorization: `Bearer ${token}` }, 
    });
};

export const deleteBook = async (id) => { 
    const token = localStorage.getItem('token');
    if (!token) {
        throw new Error('No token found');
    }
    return axios.delete(`${API_BASE}/books/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
import axios from "axios";
const API_BASE = import.meta.env.VITE_API_BASE_URL;

export const getReviewsByBookId = async (bookId) => {
    return axios.get(`${API_BASE}/reviews/${bookId}`);
};

export const createReview = async (data) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }
    return axios.post(`${API_BASE}/reviews`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const updateReview = async (id, data) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }
    return axios.put(`${API_BASE}/reviews/${id}`, data, {
        headers: { Authorization: `Bearer ${token}` },
    });
};

export const deleteReview = async (id) => {
    const token = localStorage.getItem("token");
    if (!token) {
        throw new Error("No token found");
    }
    return axios.delete(`${API_BASE}/reviews/${id}`, {
        headers: { Authorization: `Bearer ${token}` },
    });
};
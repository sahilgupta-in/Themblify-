import axios from 'axios';

// In dev, use relative URL so Vite proxy forwards /api to the backend
const baseURL = import.meta.env.DEV ? '' : (import.meta.env.VITE_BASE_URL || 'http://localhost:3000/');

const api = axios.create({
    baseURL,
    withCredentials: true
})

export default api;
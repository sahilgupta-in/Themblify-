import axios from 'axios';

// In dev: relative URL so Vite proxy forwards /api to backend. In prod: set VITE_BASE_URL in Netlify to your backend URL.
const baseURL = import.meta.env.DEV ? '' : (import.meta.env.VITE_BASE_URL || 'http://localhost:3000').replace(/\/$/, '');

const api = axios.create({
    baseURL,
    withCredentials: true,
});

export default api;
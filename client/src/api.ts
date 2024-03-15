import axios from 'axios';

const BASE_URL = import.meta.env.VITE_API_URL;

const api = axios.create({
   baseURL: BASE_URL,
});

// Add an interceptor for all requests
api.interceptors.request.use(config => {
   // Retrieve the access token from React state or a state management system
   const accessToken = localStorage.getItem('token') || '';

   // Add the access token to the Authorization header
   config.headers.Authorization = `Bearer ${accessToken}`;

   return config;
});

export default api;

import axios from 'axios';

const API = axios.create({
  baseURL: import.meta.env.REACT_APP_API_BASE_URL || 'http://web-server.localhost',
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// API.interceptors.request.use(
//   (config) => {
//     const token = localStorage.getItem('accessToken');
//     if (token) {
//       config.headers.Authorization = `Bearer ${token}`;
//     }
//     return config;
//   },
//   (error) => {
//     return Promise.reject(error);
//   }
// );

API.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response && error.response.status === 401) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export default API;
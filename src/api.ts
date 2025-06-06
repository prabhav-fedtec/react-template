// src/api.ts
import axios from 'axios';

const api = axios.create({
  validateStatus(status) {
    // don't accept redirect codes as valid
    return status >= 200 && status < 300
  },
});

if (import.meta.env.DEV) {
  const token = import.meta.env.VITE_DEV_BEARER_TOKEN;
  if (!token) {
    console.warn('No dev bearer token found in VITE_DEV_BEARER_TOKEN');
  }

  api.interceptors.request.use(config => {
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  });
}

export default api;

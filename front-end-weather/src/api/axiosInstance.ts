import axios from 'axios';

const apiClient = axios.create({
  baseURL: 'http://localhost:3405', 
  headers: {
    'Content-Type': 'application/json',
  },
});

export default apiClient;
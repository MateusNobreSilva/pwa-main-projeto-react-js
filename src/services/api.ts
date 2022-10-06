import axios from 'axios';

const api = axios.create({
  baseURL: 'https://ljsistemas.ddns.net:8084/ServidorVisita',
  // 'http://192.168.0.8:8082/ServidorVisita',
});

export default api;

import axios from 'axios';
const axiosClient = axios.create({
  baseURL: 'http://localhost:8080',
  headers: {
    'Content-Type': 'application/json',
  },
});
axiosClient.interceptors.request.use(
  function (config) {
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  }
);

// Add a response interceptor
axiosClient.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    throw(error)
  }
);
export default axiosClient;

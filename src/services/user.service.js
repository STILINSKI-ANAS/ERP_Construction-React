import axios from 'axios';
import authHeader from './auth-header';

const API_URL = 'http://localhost:8000/api';

const getPublicContent = () => {
  return axios.get(API_URL + "/all");
};

const getUser = () => {
  return axios.get(API_URL + "/user", { headers: authHeader() });
};


const userService = {
  getPublicContent,
  getUser,
};

export default userService;
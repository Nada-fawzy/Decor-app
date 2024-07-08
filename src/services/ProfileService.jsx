import axios from 'axios';

const BASE_URL = 'http://localhost:3000';

export const getUserProfile = (id) => {
  return axios.get(`${BASE_URL}/users/${id}`);
};

export const updateUserProfile = (id, user) => {
  return axios.put(`${BASE_URL}/users/${id}`, user);
};

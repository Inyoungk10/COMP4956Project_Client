import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3001' });

// export const signIn = (formData) => axios.post(url, '/signin');

export const signIn = (formData) => API.post('signin', formData);
export const signUp = (formData) => API.post('signup', formData);

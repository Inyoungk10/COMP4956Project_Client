/**
 * Author: All
 * Description: API used throughout the program to send requests to the backend.
*/
import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:3030' });

// export const signIn = (formData) => axios.post(url, '/signin');

export const signIn = (formData) => API.post('signin', formData);
export const signUp = (formData) => API.post('signup', formData);
export const addRoom = (formData) => API.post('rooms/addRoom', formData);
export const addBox = (formData) => API.post('rooms/addBox', formData);
export const addItem = (formData) => API.post('box/addItem', formData);
export const deleteRoom = (formData) => API.delete('delete/deleteRoom', formData);
export const deleteBox = (formData) => API.delete('delete/deleteBox', formData);
export const deleteItem = (formData) => API.delete('delete/deleteItem', formData);
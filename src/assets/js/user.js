import axios from 'axios';
import { API_URL, PAGE_LIMIT } from './constants';

const apiUrl = API_URL;

export const login = async (username, password) => {
    try {
        const response = await axios.post(`${apiUrl}/users/login`, {
            username,
            password
        });
        return response;
    } catch (error) {
        console.error('Login error:', error);
        throw error;
    }
}
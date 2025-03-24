import { API_URL, PAGE_LIMIT } from './constants';
import axios from 'axios';

const apiUrl = API_URL;

export const findAllLecturers = async () => {
    try {
        const limit = PAGE_LIMIT;
        const response = await axios.get(`${apiUrl}lecturers?limit=${limit}`);
        const lecturers =  response.data;
        return lecturers.data;
    } catch (error) {
        console.log(error);
    }
}
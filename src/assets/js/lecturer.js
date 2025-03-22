import { API_URL, PAGE_LIMIT } from './constants';

const apiUrl = API_URL;

export const findAllLecturers = async () => {
    try {
        const limit = PAGE_LIMIT;
        const response = await fetch(`${apiUrl}lecturers?limit=${limit}`);
        const lecturers = await response.json();
        return lecturers.data;
    } catch (error) {
        console.log(error);
    }
}
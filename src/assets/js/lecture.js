import { API_URL } from './constants';

const apiUrl = API_URL;

export const findAllLectures = async () => {
    try {
        const response = await fetch(`${apiUrl}/lectures`);
        const lecturers = await response.json();
        return lecturers.data;
    } catch (error) {
        console.log(error);
    }
}
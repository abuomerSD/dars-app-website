import axios from 'axios';
import { API_URL, PAGE_LIMIT } from './constants';

const apiUrl = API_URL;

export const findAllLectures = async () => {
    try {
        const limit = PAGE_LIMIT;
        // const response = await fetch(`${apiUrl}lectures?limit=${limit}`);
        const response = await axios.get(`${apiUrl}lectures?limit=${limit}`);
        const lectures = response.data;
        console.log(lectures);
        return lectures.data;
    } catch (error) {
        console.log(error);
    }
}

export const saveLecture = async (body) => {
    const response = await fetch(`${apiUrl}lectures`, {
        headers: {
            'Content-Type': 'application/json',
        },
        method: 'POST',
        body: body,
    });
    const lecture = await response.json();
    return lecture;
}
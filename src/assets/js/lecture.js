import axios from 'axios';
import { API_URL, PAGE_LIMIT } from './constants';

const apiUrl = API_URL;

export const findAllLectures = async () => {
    try {
        const limit = PAGE_LIMIT;
        const response = await axios.get(`${apiUrl}lectures?limit=${limit}`);
        const lectures = response.data;
        return lectures.data;
    } catch (error) {
        console.log(error);
    }
}

export const saveLecture = async (formData) => {
    console.log('formData ',formData.get('image'));
    for(var pair of formData.entries()) {
        console.log(pair[0]+', '+pair[1]);
    }
    const response = await axios.post(`${apiUrl}lectures`, {
        formData,
        headers: {
            'Content-Type': 'multipart/form-data'
        },
    });
    return response.data;
}
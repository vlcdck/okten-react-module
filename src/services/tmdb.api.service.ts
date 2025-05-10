import axios from 'axios';

const API_KEY = import.meta.env.VITE_KEY_API;
const BASE_URL = 'https://api.themoviedb.org/3';

// tmdb axios instance
export const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

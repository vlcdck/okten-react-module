import axios from "axios";
import {ITokenResponse} from "../models/ITokenResponse.ts";


const API_KEY = import.meta.env.VITE_KEY_API;

export const tmdb = axios.create({
    baseURL: 'https://api.themoviedb.org',
    params: {
        api_key: API_KEY,
    },
});

export const getRequestToken = async () => {
    const response = await tmdb.get<ITokenResponse>('/3/authentication/token/new');
    return response.data.request_token;
}
import axios from 'axios';
import {ITokenResponse} from "../models/ITokenResponse.ts";
import {ISessionResponse} from "../models/ISessionResponse.ts";

const API_KEY = import.meta.env.VITE_KEY_API;
const BASE_URL = 'https://api.themoviedb.org/3';

const tmdb = axios.create({
    baseURL: BASE_URL,
    params: {
        api_key: API_KEY,
    },
});

export const getRequestToken = async (): Promise<string> => {
    const response = await tmdb.get<ITokenResponse>('/authentication/token/new');
    return response.data.request_token;
};

export const createSession = async (request_token: string): Promise<string> => {
    const response = await tmdb.post<ISessionResponse>('/authentication/session/new', {
        request_token,
    });
    return response.data.session_id;
};

export const getAccountDetails = async (session_id: string) => {
    const response = await tmdb.get('/account', {
        params: {session_id},
    });
    return response.data;
};

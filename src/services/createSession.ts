import {tmdb} from "./getRequestToken.ts";
import {ISessionResponse} from "../models/ISessionResponse.ts";

export const createSession = async (request_token: string) => {
    const response = await tmdb.post<ISessionResponse>('/3/authentication/session/new', {
        request_token,
    });
    localStorage.setItem('session_id', JSON.stringify(response.data.session_id));
    return response.data.session_id;
};
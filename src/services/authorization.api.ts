import {ITokenResponse} from "../models/ITokenResponse.ts";
import {IAuthSessionResponse} from "../models/IAuthSessionResponse.ts";
import {IUser} from "../models/IUser.ts";
import {IGuestSessionResponse} from "../models/IGuestSessionResponse.ts";
import {tmdb} from "./tmdb.api.service.ts";

export const getRequestToken = async (): Promise<string> => {
    const response = await tmdb.get<ITokenResponse>('/authentication/token/new');
    console.log(response.data.request_token)
    return response.data.request_token;
};

export const createSession = async (request_token: string): Promise<string> => {
    const response = await tmdb.post<IAuthSessionResponse>('/authentication/session/new', {
        request_token,
    });
    return response.data.session_id;
};

export const getAccountDetails = async (session_id: string): Promise<IUser> => {
    const response = await tmdb.get<IUser>('/account', {
        params: {session_id},
    });
    return response.data;
};

// guest session
export const createGuestSession = async (): Promise<string> => {
    const response = await tmdb.get<IGuestSessionResponse>('/authentication/guest_session/new');
    return response.data.guest_session_id;
};
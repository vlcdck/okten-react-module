import {tmdb} from "./getRequestToken.ts";

export const getAccountDetails = async (session_id: string) => {
    const response = await tmdb.get('/3/account', {
        params: {session_id},
    });
    return response.data;
};
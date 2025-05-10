import {tmdb} from "./tmdb.api.service.ts";

type RatingResponse = {
    rated: { value: number } | boolean;
};

const getAuthParams = (sessionId: string, isGuest: boolean) =>
    isGuest ? {guest_session_id: sessionId} : {session_id: sessionId};

// if auth user, get rating from TMDB
// if guest user, return null
export const getUserRating = async (
    movieId: number,
    sessionId: string,
    isGuest: boolean
): Promise<number | null> => {

    if (isGuest) return null;

    try {
        const response = await tmdb.get<RatingResponse>(
            `/movie/${movieId}/account_states`,
            {
                params: {
                    ...getAuthParams(sessionId, isGuest),
                },
            }
        );

//Checks if the user has a rating for the movie, and if so, returns its value.
        if (typeof response.data.rated === "object" && "value" in response.data.rated) {
            return response.data.rated.value;
        }

        return null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

// set rating to TMDB
export const rateMovie = async (
    movieId: number,
    ratingValue: number,
    sessionId: string,
    isGuest: boolean
): Promise<boolean> => {
    try {
        await tmdb.post(
            `/movie/${movieId}/rating`,
            {value: ratingValue},
            {
                params: {
                    ...getAuthParams(sessionId, isGuest),
                },
            }
        );

        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};

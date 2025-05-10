import {IResponseApi} from "../models/IResponseApi.ts";
import {IMovie} from "../models/IMovie.ts";
import {tmdb} from "./tmdb.api.service.ts";
import {IGenre} from "../models/IGenres.ts";

export const getSearchedMovies = async (query: string, page: number): Promise<IResponseApi & { results: IMovie[] }> => {
    const response = await tmdb.get<IResponseApi & { results: IMovie[] }>(`/search/movie`, {
        params: {query, page},
    });
    return response.data;
}

export const getPopularMovies = async (page: number): Promise<IResponseApi & { results: IMovie[] }> => {
    const response = await tmdb.get<IResponseApi & { results: IMovie[] }>(`/movie/popular`,
        {
            params: {page},
        });
    return response.data;
}

export const getDetailMovie = async (id: string): Promise<IMovie> => {
    const response = await tmdb.get<IMovie>(`/movie/${id}`);
    return response.data;
}

export const getGenres = async (): Promise<IGenre[]> => {
    const response = await tmdb.get<{ genres: IGenre[] }>('/genre/movie/list');
    return response.data.genres;
}

export const getMovieByGenre = async (genreId: number, page: number): Promise<IResponseApi & { results: IMovie[] }> => {
    const response = await tmdb.get<IResponseApi & { results: IMovie[] }>(`/discover/movie`, {
        params: {with_genres: genreId, page},
    });
    return response.data;
}
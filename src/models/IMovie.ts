export interface IMovie {
    adult: boolean;
    backdrop_path: string;
    genres: IGenre[];
    id: number;
    original_language: string;
    original_title: string;
    overview: string;
    popularity: number;
    poster_path: string;
    release_date: string;
    title: string;
    video: boolean;
    vote_average: number;
    vote_count: number;
}

export interface IGenre {
    id: number;
    name: string;
}
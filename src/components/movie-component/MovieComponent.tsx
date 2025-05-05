import {FC} from "react";
import {IMovie} from "../../models/IMovie.ts";
import './MovieComponent.css'

type MoviePropType = {
    movie: IMovie,
}

export const MovieComponent: FC<MoviePropType> = ({movie}) => {

    const imagePath: string = movie.poster_path;

    return (
        <div className={'movie-container'}>
            <img className={'movie-poster'}
                 src={`https://image.tmdb.org/t/p/w500/${imagePath}`} alt={movie.title}/>
            <div className={'movie-data'}>
                <h3>{movie.title}</h3>
                <p>{movie.vote_average}</p>
            </div>
        </div>
    );
};
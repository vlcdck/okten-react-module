import {FC} from "react";
import {IMovie} from "../../models/IMovie.ts";
import './MovieComponent.css';
import {Link} from "react-router";

type MoviePropType = {
    movie: IMovie;
}

export const MovieComponent: FC<MoviePropType> = ({movie}: MoviePropType) => {

    return (

        <div className={'movie-container'}>
            <Link to={`/movie/${movie.id}`}>
                <img className={'movie-poster'} src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`}
                     alt={movie.title}/>
            </Link>
            <Link to={`/movie/${movie.id}`}>
                <p className={'movie-title'}>{movie.title}</p>
            </Link>
        </div>
    );
};
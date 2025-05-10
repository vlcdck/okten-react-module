import {useParams} from "react-router";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {useEffect} from "react";
import {movieDetailActions} from "../../redux/slices/movieSlice.ts";
import {PreloaderComponent} from "../preloader-component/PreloaderComponent.tsx";
import './MovieDetailComponent.css';
import {RatingComponent} from "../rating-component/RatingComponent.tsx";

export const MovieDetailComponent = () => {

    const {id} = useParams();
    const dispatch = useAppDispatch();
    const {movie, isLoading, error} = useAppSelector(state => state.moviesStoreSlice);

    // load movie details
    useEffect(() => {
        if (!id) return;
        dispatch(movieDetailActions.fetchDetailMovie(id));
    }, [id, dispatch]);


    if (isLoading) {
        return <PreloaderComponent/>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!movie) {
        return <div>No movie data available</div>;
    }

    return (

        <div className={'movie-detail'}>
            <h1>{movie.title}</h1>
            <img src={`https://image.tmdb.org/t/p/w500/${movie.poster_path}`} alt={movie.title}/>
            <p>{movie.overview}</p>
            <div className="movie-detail__row">
                <p className="movie-detail__heading">Adult:</p>
                <p className="movie-detail__value">{movie.adult ? 'Yes' : 'No'}</p>
            </div>
            <div className="movie-detail__row">
                <p className="movie-detail__heading">Genre:</p>
                <p className="movie-detail__value">
                    {/*Show all genres at film*/}
                    {movie.genres.length > 0
                        ? movie.genres.map(genre => genre.name).join(', ')
                        : 'N/A'}
                </p>
            </div>
            <div className="movie-detail__row">
                <p className="movie-detail__heading">Release Date:</p>
                <p className="movie-detail__value">{movie.release_date}</p>
            </div>
            <div className="movie-detail__row">
                <p className="movie-detail__heading">Popularity:</p>
                <p className="movie-detail__value">{movie.popularity}</p>
            </div>
            <div className="movie-detail__row">
                <p className="movie-detail__heading">Vote Average:</p>
                <p className="movie-detail__value">{movie.vote_average}</p>
                {/*load rating component*/}
                <RatingComponent movieId={movie.id}/>
            </div>
            <div className="movie-detail__row">
                <p className="movie-detail__heading">Vote Count:</p>
                <p className="movie-detail__value">{movie.vote_count}</p>
            </div>
            <div className="movie-detail__row">
                <p className="movie-detail__heading">Original Language:</p>
                <p className="movie-detail__value">{movie.original_language}</p>
            </div>
            <div className="movie-detail__row">
                <p className="movie-detail__heading">Original Title:</p>
                <p className="movie-detail__value">{movie.original_title}</p>
            </div>
            <div className="movie-detail__row">
                <p className="movie-detail__heading">Video:</p>
                <p className="movie-detail__value">{movie.video ? 'Yes' : 'No'}</p>
            </div>
        </div>
    );
};
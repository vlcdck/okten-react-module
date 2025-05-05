import {useSearchParams} from "react-router";
import {useAppSelector} from "../../redux/hooks/useAppSelector.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";
import {useEffect} from "react";
import {movieActions} from "../../redux/slices/movieSlice.ts";
import {LoaderComponent} from "../loader-component/LoaderComponent.tsx";
import { MovieComponent } from "../movie-component/MovieComponent.tsx";
import './MoviesListComponent.css'

export const MoviesListComponent = () => {

    const [searchParams] = useSearchParams({page: "1"});
    const {movies, movieLoadState} = useAppSelector(({movieStoreSlice}) => movieStoreSlice)
    const dispatch = useAppDispatch()

    useEffect(() => {
        const currentPage = searchParams.get("page") || "1";
        dispatch(movieActions.loadMovies(currentPage))
    }, [searchParams]);

    return (
        <div className={'movies-list'}>
            {!movieLoadState && <LoaderComponent/>}
            {
                movies.map(movie => <MovieComponent key={movie.id} movie={movie}/>)
            }
        </div>
    );
};
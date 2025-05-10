import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {MovieComponent} from "../movie-component/MovieComponent.tsx";
import {PaginationComponent} from "../pagination-component/PaginationComponent.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useEffect} from "react";
import {recommendationMovieActions} from "../../redux/slices/recommendationMovieSlice.ts";

import './MovieListComponent.css';
import { PreloaderComponent } from "../preloader-component/PreloaderComponent.tsx";

export const MoviesListComponent = () => {

    const {results, isLoading, query, page, totalPages} = useAppSelector(state => state.searchStoreSlice);

    const {
        movies: recommended,
        isLoading: recLoading,
        page: recPage,
        totalPages: recTotal
    } = useAppSelector(state => state.recommendationMovieStoreSlice);

    const {
        genreId,
        movies: genreMovies,
        isLoading: genreLoading,
        page: genrePage,
        totalPages: genreTotal
    } = useAppSelector(state => state.genreMovieStoreSlice);

    const dispatch = useAppDispatch();

    // first load recommendations
    useEffect(() => {
        dispatch(recommendationMovieActions.fetchRecommendationMovies(1));
    }, [dispatch]);

    // logic for type of movies (searched, recommended or genre)
    const isSearching = query.trim().length > 0;
    let movies = recommended;
    let isLoadingMovies = recLoading;
    let currentPage = recPage;
    let totalPagesDisplay = recTotal;

    if (genreId !== null) {
        movies = genreMovies;
        isLoadingMovies = genreLoading;
        currentPage = genrePage;
        totalPagesDisplay = genreTotal;
    } else if (query.trim().length > 0) {
        movies = results;
        isLoadingMovies = isLoading;
        currentPage = page;
        totalPagesDisplay = totalPages;
    }

    return (
        <div className={'movies-list'}>
            {isLoadingMovies && (
                <div className="loader-container">
                    <PreloaderComponent/>
                </div>
            )}
            {
                movies.map(movie => <MovieComponent key={movie.id} movie={movie}/>)
            }
            <PaginationComponent currentPage={currentPage} totalPages={totalPagesDisplay} isSearch={isSearching}
                                 isGenre={genreId !== null} genreId={genreId !== null ? genreId : undefined}/>
        </div>
    );
};
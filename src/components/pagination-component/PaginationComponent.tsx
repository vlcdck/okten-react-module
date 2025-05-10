import {FC} from "react";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {searchActions} from "../../redux/slices/searchSlice.ts";
import {recommendationMovieActions} from "../../redux/slices/recommendationMovieSlice.ts";
import './PaginationComponent.css';
import {genreMovieActions} from "../../redux/slices/genreMovieSlice.ts";

type PaginationPropType = {
    currentPage: number;
    totalPages: number;
    isSearch?: boolean;
    isGenre?: boolean;
    genreId?: number;
}

export const PaginationComponent: FC<PaginationPropType> =
    ({currentPage, totalPages, isSearch, isGenre, genreId}: PaginationPropType) => {

        const dispatch = useAppDispatch();
        const query = useAppSelector(state => state.searchStoreSlice.query);

        const changePage = (newPage: number) => {
            if (newPage < 1 || newPage > totalPages) return;

            // logic for the correct number of pages

            if (isSearch) {
                dispatch(searchActions.fetchSearchMovies({query, page: newPage}));
            } else if (isGenre && genreId !== undefined) {
                dispatch(genreMovieActions.fetchGenreMovies({genreId, page: newPage}));
            } else {
                dispatch(recommendationMovieActions.fetchRecommendationMovies(newPage));
            }
        }

        return (
            <div className="pagination-buttons">
                <button onClick={() => changePage(currentPage - 1)} disabled={currentPage === 1}>
                    ⬅ Previous
                </button>
                <span>{currentPage} / {totalPages}</span>
                <button onClick={() => changePage(currentPage + 1)} disabled={currentPage === totalPages}>
                    Next ➡
                </button>
            </div>
        );
    };
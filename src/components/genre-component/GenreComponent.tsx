import {useAppDispatch} from "../../redux/hooks/useAppDispatch";
import {useAppSelector} from "../../redux/hooks/useAppSelector";
import {useEffect} from "react";
import {genreSliceActions} from "../../redux/slices/genreSlice.ts";
import {genreMovieActions} from "../../redux/slices/genreMovieSlice.ts";
import {GenreButtonComponent} from "../genre-button-component/GenreButtonComponent.tsx";
import './GenreComponent.css';
import {movieDetailActions} from "../../redux/slices/movieSlice.ts";
import {useNavigate} from "react-router";

export const GenreComponent = () => {
    const dispatch = useAppDispatch();
    const {genres} = useAppSelector(state => state.genreStoreSlice);
    const {genreId: genreIdFromStore} = useAppSelector(state => state.genreMovieStoreSlice);
    const navigate = useNavigate();

    useEffect(() => {
        dispatch(genreSliceActions.fetchGenres())
    }, [dispatch]);

    const handleClick = (id: number) => {
        dispatch(genreMovieActions.setGenreId(id));
        dispatch(genreMovieActions.fetchGenreMovies({genreId: id, page: 1}));
        dispatch(movieDetailActions.clearMovie());
        navigate('/');
    };

    return (
        <div className="genre-buttons">
            {genres.map((genre) => (
                <GenreButtonComponent
                    key={genre.id}
                    genre={genre}
                    genreId={genreIdFromStore !== null ? genreIdFromStore : -1} // -1 is default genreId
                    handleClick={handleClick}
                />
            ))}
        </div>


    );
};
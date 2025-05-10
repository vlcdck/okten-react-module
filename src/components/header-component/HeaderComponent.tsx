import {useNavigate} from "react-router";
import './HeaderComponent.css';
import {LoginComponent} from "../login-component/LoginComponent.tsx";
import {SearchFormComponent} from "../search-form-component/SearchFormComponent.tsx";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {recommendationMovieActions} from "../../redux/slices/recommendationMovieSlice.ts";
import {searchActions} from "../../redux/slices/searchSlice.ts";
import {genreMovieActions} from "../../redux/slices/genreMovieSlice.ts";



export const HeaderComponent = () => {

    const navigate = useNavigate();
    const dispatch = useAppDispatch();

    // after click on logo reset genres, search and load recommendations

    const handleLogoClick = () => {
        dispatch(genreMovieActions.resetGenreMovies());
        dispatch(searchActions.clearSearch());
        dispatch(recommendationMovieActions.fetchRecommendationMovies(1));
        navigate('/');
    };

    return (
        <header className={'header'}>
            <button onClick={handleLogoClick} className="logo-button">
                The Movie App
            </button>
            <SearchFormComponent/>
            <LoginComponent/>
        </header>
    );
};
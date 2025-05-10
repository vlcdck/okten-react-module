import './SearchFormComponent.css';
import {useAppDispatch} from '../../redux/hooks/useAppDispatch';
import {useForm} from "react-hook-form";
import {searchActions} from "../../redux/slices/searchSlice.ts";
import {movieDetailActions} from "../../redux/slices/movieSlice.ts";
import {useNavigate} from "react-router";
import {genreMovieActions} from "../../redux/slices/genreMovieSlice.ts";

export const SearchFormComponent = () => {

    type SearchFormInputs = {
        search: string;
    };

    const dispatch = useAppDispatch();
    const {register, handleSubmit, reset} = useForm<SearchFormInputs>();
    const navigate = useNavigate();

    const onSubmit = (data: SearchFormInputs) => {
        const query = data.search.trim();
        if (!query) return;

        // clear genre, and close movie detail
        dispatch(genreMovieActions.setGenreId(null));
        dispatch(movieDetailActions.clearMovie());
        navigate('/');
        // search movies
        dispatch(searchActions.setQuery(query));
        dispatch(searchActions.fetchSearchMovies({query, page: 1}));
        reset();
    };

    return (
        <form className={'search-form'} onSubmit={handleSubmit(onSubmit)}>
            <input
                className="search-input"
                type="text"
                placeholder="Search"
                {...register('search')}
            />
            <button className={'search-btn'} type="submit" style={{cursor: 'pointer'}}>
                <img src="src/assets/icons/search_ico.png" alt="Search"/>
            </button>
        </form>
    );
};
import {MoviesListComponent} from "../components/movie-list-component/MoviesListComponent.tsx";
import {GenreComponent} from "../components/genre-component/GenreComponent.tsx";

export const MainPage = () => {

    return (
        <div className={'main-page'}>
            <GenreComponent/>
            <MoviesListComponent/>
        </div>
    );
};
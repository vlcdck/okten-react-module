import {PaginationComponent} from "../../components/pagination-component/PaginationComponent.tsx";
import {MoviesListComponent} from "../../components/movies-list-component/MoviesListComponent.tsx";

export const HomePage = () => {



    return (
        <div>
            <MoviesListComponent/>
            <PaginationComponent/>
        </div>
    );
};
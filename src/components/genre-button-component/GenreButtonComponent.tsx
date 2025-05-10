import { FC } from "react";

type GenreButtonPropType = {
    genre: {
        id: number;
        name: string;
    };
    genreId: number;
    handleClick: (id: number) => void;
}

// Genres Buttons

export const GenreButtonComponent: FC<GenreButtonPropType> = ({genre, genreId, handleClick}: GenreButtonPropType) => {
    return (
        <button
            onClick={() => handleClick(genre.id)}
            className={`genre-btn ${genreId === genre.id ? 'active' : ''}`}
        >
            {genre.name}
        </button>
    );
};
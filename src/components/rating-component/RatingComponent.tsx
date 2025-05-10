import {useAppDispatch} from "../../redux/hooks/useAppDispatch";
import {useAppSelector} from "../../redux/hooks/useAppSelector.tsx";
import {FC, useEffect, useState} from "react";
import {getUserRating, rateMovie} from "../../services/rating.api.service.ts";
import {ratingActions} from "../../redux/slices/ratingSlice.ts";
import './RatingComponent.css';

type RatingPropType = {
    movieId: number;
}

export const RatingComponent: FC<RatingPropType> = ({movieId}) => {

    const dispatch = useAppDispatch();
    const {sessionId, isGuest} = useAppSelector(state => state.authStoreSlice);
    const currentRating = useAppSelector(state => state.ratingStoreSlice.rating[movieId]);

    const [hovered, setHovered] = useState<number | null>(null);
    const [loading, setLoading] = useState(false);

    // load auth user rating if it is set by user
    useEffect(() => {
        const fetchRating = async () => {
            if (!sessionId) return;
            const userRating = await getUserRating(movieId, sessionId, isGuest);
            if (userRating) {
                dispatch(ratingActions.setRating({movieId, rating: userRating}))
            }
        }

        fetchRating()

    }, [movieId, isGuest, sessionId, dispatch]);

    // setting new rating, if guest unavailable to set
    const handleClick = async (value: number) => {
        if (!sessionId || isGuest) {
            alert('Log in to rate the movie!');
            return;
        }
        setLoading(true);
        // rate movie by user
        const succes = await rateMovie(movieId, value, sessionId, isGuest);
        if (succes) {
            // load rating to redux
            dispatch(ratingActions.setRating({movieId, rating: value}))
        }
        setLoading(false);
    }


    return (
        <div className="rating-container">
            {[...Array(10)].map((_, i) => {
                const value = i + 1;
                const isActive = hovered !== null ? value <= hovered : value <= (currentRating || 0);

                return (
                    <span
                        key={value}
                        className={`star ${isActive ? 'active' : ''} ${loading ? 'loading' : ''}`}
                        onMouseEnter={() => !loading && setHovered(value)}
                        onMouseLeave={() => !loading && setHovered(null)}
                        onClick={() => !loading && handleClick(value)}
                    >
            {isActive ? '★' : '☆'}
          </span>
                );
            })}
        </div>
    );
};
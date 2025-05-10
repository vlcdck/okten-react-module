import {useLocation, useNavigate} from "react-router";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch";
import {useEffect} from "react";
import {authActions} from "../../redux/slices/authSlice.ts";

// Callback after authorization

export const Callback = () => {

    const location = useLocation(); // Get the current URL
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        // Getting parameters from the URL
        const params = new URLSearchParams(location.search);
        const token = params.get('request_token');

        if (token) {
            // If there is a request_token, pass it to Redux
            dispatch(authActions.fetchSessionAndUser(token))
                .then(() => {
                    // After successful authorization, redirect to the main page.
                    navigate('/');
                })
        }
    }, [location.search, dispatch, navigate]);

    return <p>Завершення авторизації...</p>;
};
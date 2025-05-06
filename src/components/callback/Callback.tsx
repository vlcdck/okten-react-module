import {useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {authActions} from "../../redux/slices/authSlice.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";

export const Callback = () => {
    const [params] = useSearchParams();
    const token = params.get('request_token');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            const sessionAndUser = dispatch(authActions.fetchSessionAndUser(token));
                sessionAndUser.then(() => {
                navigate('/');
            });
        }
    }, [token]);

    return <p>Logging in...</p>;
};
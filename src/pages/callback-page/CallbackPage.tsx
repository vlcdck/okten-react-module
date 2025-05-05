import {useEffect} from 'react';
import {useNavigate, useSearchParams} from 'react-router-dom';
import {fetchSessionAndUser} from "../../redux/slices/authSlice.ts";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.ts";

export const CallbackPage = () => {
    const [params] = useSearchParams();
    const token = params.get('request_token');
    const dispatch = useAppDispatch();
    const navigate = useNavigate();

    useEffect(() => {
        if (token) {
            dispatch(fetchSessionAndUser(token)).then(() => {
                navigate('/');
            });
        }
    }, [token]);

    return <p>Logging in...</p>;
};

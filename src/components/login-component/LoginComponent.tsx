import {useAppSelector} from "../../redux/hooks/useAppSelector";
import {useNavigate} from "react-router";
import {useAppDispatch} from "../../redux/hooks/useAppDispatch.tsx";
import {authActions, rehydrateSession} from "../../redux/slices/authSlice.ts";
import './LoginComponent.css'
import {getRequestToken} from "../../services/authorization.api.ts";

export const LoginComponent = () => {


    const dispatch = useAppDispatch();
    const {user, isGuest, sessionId} = useAppSelector(state => state.authStoreSlice);
    const navigate = useNavigate();

    const handleLogin = async () => {
        try {
            const requestToken = await getRequestToken(); // get request token from TMDB
            // save callback url
            const redirectUrl = encodeURIComponent(`${window.location.origin}/callback`);

            // redirect to the authorization page TMDB
            window.location.href = `https://www.themoviedb.org/authenticate/${requestToken}?redirect_to=${redirectUrl}`;
        } catch (err) {
            console.error('Error to get request token:', err);
        }
    }

    const handleLogout = () => {
        dispatch(authActions.logout());
        dispatch(rehydrateSession()); // restores a user session or creates a guest session
        navigate('/')
    }

    if (!sessionId || isGuest) {
        return <button className={'login-button'} onClick={handleLogin}>LogIn</button>;
    }
    if (user) {
        return (
            <div className={'login-container'}>
                <p className={'user-info'}>{user.username}</p>
                <button className={'login-button'} onClick={handleLogout}>LogOut</button>
            </div>
        );
    }

};
import {logout} from '../redux/slices/authSlice';
import {useAppDispatch} from '../redux/hooks/useAppDispatch';
import {useAppSelector} from "../redux/hooks/useAppSelector.ts";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const {user, sessionId, loading} = useAppSelector(({auth}) => auth);

    const signOut = () => dispatch(logout());

    return {user, sessionId, loading, signOut};
};
import {useAppDispatch} from "../redux/hooks/useAppDispatch";
import {useAppSelector} from "../redux/hooks/useAppSelector.tsx";
import {authActions} from "../redux/slices/authSlice.ts";

export const useAuth = () => {
    const dispatch = useAppDispatch();
    const {user, sessionId, loading} = useAppSelector(state => state.authStoreSlice);

    const signOut = () => dispatch(authActions.logout());

    return {user, sessionId, loading, signOut};
}
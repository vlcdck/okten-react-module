import {HeaderComponent} from "../components/header-component/HeaderComponent.tsx";
import {useAppDispatch} from "../redux/hooks/useAppDispatch.tsx";
import {useEffect} from "react";
import {authActions} from "../redux/slices/authSlice.ts";
import {Outlet} from "react-router-dom";

export const MainLayout = () => {

    const dispatch = useAppDispatch();

    // restores a user session or creates a guest session
    useEffect(() => {
        dispatch(authActions.rehydrateSession())
    }, [dispatch]);

    return (
        <>
            <HeaderComponent/>
            <Outlet/>
        </>
    );
};
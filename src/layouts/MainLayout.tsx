import {Outlet} from "react-router";
import {HeaderComponent} from "../components/header-component/HeaderComponent.tsx";

export const MainLayout = () => {
    return (
        <>
            <HeaderComponent/>
            <Outlet/>
        </>
    );
};
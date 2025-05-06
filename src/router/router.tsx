import {createBrowserRouter} from "react-router";
import {LoginComponent} from "../components/LoginComponent/LoginComponent.tsx";
import {Callback} from "../components/callback/Callback.tsx";
// import {MainLayout} from "../layouts/MainLayout.tsx";
// import {MainPage} from "../pages/MainPage.tsx";

export const routes = createBrowserRouter([
    // {
    //     path: '/', element: <MainLayout/>, children: [
    //         {index: true, element: <MainPage/>},
    //
    //     ]
    // }
    {path: "/", element: <LoginComponent/>},
    {path: '/callback', element: <Callback/>}
])
import {createBrowserRouter} from "react-router";
import {LoginComponent} from "../components/loginComponent/LoginComponent.tsx";
import {CallbackPage} from "../pages/callback-page/CallbackPage.tsx";

export const routes = createBrowserRouter([
    // {
    //     path: '/', element: <MainLayout/>, children: [
    //         {index: true, element: <HomePage/>}
    //     ]
    // }

    {
        path: '/', element: <LoginComponent/>, children: [
            {path: '/callback', element: <CallbackPage/>}
        ]
    }

])
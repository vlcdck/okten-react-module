import {createBrowserRouter} from "react-router";
import {MainLayout} from "../layouts/MainLayout.tsx";
import {Callback} from "../components/callback/Callback.tsx";
import {MainPage} from "../pages/MainPage.tsx";
import {MovieDetailPage} from "../pages/MovieDetailPage.tsx";

export const routes = createBrowserRouter([
    {
        path: '/', element: <MainLayout/>, children: [
            {index: true, element: <MainPage/>},
            {path: 'movie/:id', element: <MovieDetailPage/>}
        ],
    },
    {path: '/callback', element: <Callback/>,},
]);
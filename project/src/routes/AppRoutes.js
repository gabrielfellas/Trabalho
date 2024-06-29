import {RouterProvider, createBrowserRouter } from 'react-router-dom';
import Login from '../pages/Login/Login';
import Home from '../pages/Clima/Clima';

const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },
    {
        path: '/home',
        element: <Home />
    }
]);

const AppRoutes = () => {
    return <RouterProvider router={router}/>
}

export default AppRoutes;
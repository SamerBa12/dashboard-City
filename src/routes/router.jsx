import { createBrowserRouter } from "react-router-dom";
import Root from "../Root";
import Login from "../pages/Login";
import AddCity from "../pages/AddCity";
import AllCities from "../pages/AllCities";
import StatusCites from "../pages/StatusCites";
import EditCity from "../pages/EditCity";


export const routesPages = [
    {
        path: '/add-city',
        element: <AddCity />,
        name: 'اضافة مدينة'
    },
    {
        path: '/status-city',
        element: <StatusCites />,
        name: 'حالة المدن '
    },
    {
        path: '/all-cities',
        element: <AllCities />,
        name: 'المدن'
    },
    {
        path: '/edit-city/:id',
        element: <EditCity />
    },

]
export const router = createBrowserRouter([
    {
        path: '/',
        element: <Login />
    },

    {
        path: '/',
        element: <Root />,
        children:
            routesPages.map((route) => ({
                path: route.path,
                element: route.element,
            })),

    }
])
import {AnimatePresence} from "framer-motion";
import {Navigate, Outlet, useRoutes} from "react-router-dom";
import {FourOhFour} from "./routes/error/FourOhFour.tsx";
import HomePage from "./routes/home/HomePage.tsx";
import GuestAccessPage from "./routes/access/GuestAccessPage.tsx";
import Layout from "./components/Layout.tsx";
import AddPhotosPage from "./routes/add-photos/AddPhotosPage.tsx";

const GuestGuard = () => {
    const guestName = localStorage.getItem("guestName");

    if (!guestName) {
        return <Navigate to="/guest" replace/>;
    }

    return <Outlet></Outlet>;
};


export const AnimatedRoutes = () => {
    const GlobalRoutes = useRoutes([
            {
                path: "/",
                element: <Layout/>,
                children: [
                    {
                        path: "/",
                        element: <GuestGuard/>,
                        children: [
                            {index: true, element: <HomePage/>},
                            {path: "/add-photos", element: <AddPhotosPage/>}
                        ]
                    },
                    {
                        path: "/guest",
                        element: <GuestAccessPage/>,
                    },
                    {
                        path: "/*",
                        element: <FourOhFour/>,
                    },
                ]
            }
        ])
    ;

    if (!GlobalRoutes) return <div>An error occured</div>;

    return <AnimatePresence mode="wait">{GlobalRoutes}</AnimatePresence>;
};
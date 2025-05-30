import {AnimatePresence} from "framer-motion";
import {useRoutes} from "react-router-dom";
import {FourOhFour} from "./routes/error/FourOhFour.tsx";
import HomePage from "./routes/home/HomePage.tsx";
import {Navigate, Outlet} from "react-router-dom";
import GuestAccessPage from "./routes/access/GuestAccessPage.tsx";
import Layout from "./routes/home/components/Layout.tsx";

const GuestGuard = () => {
    const guestName = localStorage.getItem("guestName");

    if (!guestName) {
        return <Navigate to="/guest" replace />;
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
                        {index: true, element: <HomePage/>}
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
    ]);

    if (!GlobalRoutes) return <div>An error occured</div>;

    return <AnimatePresence mode="wait">{GlobalRoutes}</AnimatePresence>;
};
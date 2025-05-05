import {AnimatePresence} from "framer-motion";
import {useRoutes} from "react-router-dom";
import {FourOhFour} from "./routes/error/FourOhFour.tsx";
import HomePage from "./routes/home/HomePage.tsx";


export const AnimatedRoutes = () => {
    const GlobalRoutes = useRoutes([
        {
            path: "/",
            element: <HomePage/>,
        },
        {
            path: "/*",
            element: <FourOhFour/>,
        },
    ]);

    if (!GlobalRoutes) return <div>An error occured</div>;

    return <AnimatePresence mode="wait">{GlobalRoutes}</AnimatePresence>;
};
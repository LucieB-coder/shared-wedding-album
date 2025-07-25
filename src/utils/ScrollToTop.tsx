import {useEffect} from "react";
import {useLocation} from "react-router-dom";

const ScrollToTop = () => {
    const location = useLocation();

    useEffect(() => {
        const topElement = document.getElementById("top");
        if (topElement) {
            topElement.scrollTo(0, 0);
        }
    }, [location]);


    return null;
};

export default ScrollToTop;
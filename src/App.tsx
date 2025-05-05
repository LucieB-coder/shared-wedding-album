import {BrowserRouter} from "react-router-dom";
import {QueryParamProvider} from "use-query-params";
import {ReactRouter6Adapter} from "use-query-params/adapters/react-router-6";
import {AnimatedRoutes} from "./router";
import ScrollToTop from "./utils/ScrollToTop.tsx";

function App() {
    return (
        <BrowserRouter>
            <QueryParamProvider adapter={ReactRouter6Adapter}>
                <ScrollToTop/>
                <AnimatedRoutes/>
            </QueryParamProvider>
        </BrowserRouter>
    );
}

export default App;
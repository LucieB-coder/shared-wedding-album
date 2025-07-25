import {QueryClient, QueryClientProvider} from "@tanstack/react-query";
import {StrictMode} from "react";
import {createRoot} from "react-dom/client";
import App from "./App";
export const queryClient = new QueryClient();

createRoot(document.getElementById("root")!).render(
    <StrictMode>
        <QueryClientProvider client={queryClient}>
            <App/>
        </QueryClientProvider>
    </StrictMode>
);
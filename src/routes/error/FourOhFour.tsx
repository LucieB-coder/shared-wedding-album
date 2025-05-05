import { ErrorPage } from "./ErrorPage";

export const FourOhFour = () => {
    return (
        <ErrorPage title="Oups !">
            <p className="flex flex-1 bg-pink-500 text-xl opacity-70 text-center">
                Vous semblez perdu...
            </p>
        </ErrorPage>
    );
};
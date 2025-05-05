import {ArrowRightIcon} from "lucide-react";
import {useNavigate} from "react-router-dom";
import type {ReactNode} from "react";

export const ErrorPage = ({title, children}: { title: string; children: ReactNode }) => {
    const navigate = useNavigate();
    return (
        <div
            className="flex flex-col w-full items-center h-screen py-24 space-y-24 bg-black/30 bg-blend-overlay"
        >
            <div className="flex flex-col gap-5 items-center ">
                <p className="text-3xl text-white/90 font-semibold">{title}</p>

                <div className="flex flex-col items-center justify-center text-white/80 space-y-6">
                    {children}
                    <button onClick={() => navigate("/")}>
                        <span>Retour à la page d'accueil</span>{" "}
                        <ArrowRightIcon className="size-5 shrink-0 grow-0"/>
                    </button>
                </div>
            </div>
        </div>
    );
};

export default ErrorPage;
import {ArrowLeft} from "lucide-react";
import {useNavigate} from "react-router-dom";

const GoBackButton = () => {
    const navigate = useNavigate();
    return (
        <button
            type="button"
            onClick={() => navigate("/")}
            className="flex py-2 font-semibold text-sm text-white/90"
        >
            <ArrowLeft className="size-5 shrink-0 grow-0"/>
            <span>Accueil</span>
        </button>
    );
};

export default GoBackButton;
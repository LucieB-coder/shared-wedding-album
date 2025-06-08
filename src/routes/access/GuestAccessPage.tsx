import React, {useState} from "react";
import {useNavigate} from "react-router-dom";
import GlassCard from "../../components/GlassCard.tsx";

const VALID_GUESTS_NAMES = ["frank", "corinne", "marceline", "rory", "odile", "violaine", "cyril", "chloé", "lenny", "guillaume", "sandrine", "emma", "cédric", "emilie", "loann", "karine", "jean-paul", "lucie", "léo"]

const GuestAccessPage = () => {
    const [name, setName] = useState("");
    const [accessRefused, setAccessRefused] = useState(false);
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        setAccessRefused(false);
        if (name.trim() && VALID_GUESTS_NAMES.includes(name.trim().toLowerCase())) {
            localStorage.setItem("guestName", name.trim().toLowerCase());
            navigate("/");
        } else {
            setAccessRefused(true);
        }
    };

    return (
        <GlassCard>
            <h2 className="text-xl font-semibold mb-4">Bienvenue sur l’album photo du mariage 💍📸</h2>
            <p className="">Entre ton prénom pour que l’on sache qui capture tous ces beaux souvenirs ✨</p>
            <form onSubmit={handleSubmit}>
                <input
                    type="text"
                    placeholder="Alicia"
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    className="transition w-full p-3 my-8 placeholder:opacity-75 text-3xl focus:border-b focus:border-b-white/80 focus:outline-none focus:ring-0"
                    required
                />
                {accessRefused && (
                    <p className="text-red-300 pb-2 px-1.5">Invité introuvable... As-tu écrit ton prénom correctement
                        ?</p>)}
                <button type="submit"
                        className="w-full bg-white text-green-900 py-2 rounded-full disabled:opacity-70 font-semibold"
                        disabled={!name.trim()}>
                    <p>
                        C’est moi, <span className="font-bold">"{name || "Alicia"}"</span> !
                    </p>
                </button>

            </form>

        </GlassCard>
    );
};

export default GuestAccessPage;

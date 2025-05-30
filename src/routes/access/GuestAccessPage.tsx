import React, {useState} from "react";
import {useNavigate} from "react-router-dom";

const GuestAccessPage = () => {
    const [name, setName] = useState("");
    const navigate = useNavigate();

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        if (name.trim()) {
            localStorage.setItem("guestName", name.trim().toLowerCase());
            navigate("/");
        }
    };

    return (
        <div className="flex flex-1 flex-col p-4 backdrop-blur-2xl rounded-2xl text-white">
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
                <button type="submit"
                        className="w-full bg-white text-green-900 py-2 rounded-full disabled:opacity-70 font-semibold"
                        disabled={!name.trim()}>
                    <p>
                        C’est moi, <span className="font-bold">"{name || "Alicia"}"</span> !
                    </p>
                </button>
            </form>
        </div>
    );
};

export default GuestAccessPage;

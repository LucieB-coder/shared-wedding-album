import {AlbumItemsList} from "./components/AlbumItemsList.tsx";
import {Link} from "react-router-dom";
import {PlusIcon} from "lucide-react";
import GlassCard from "../../components/GlassCard.tsx";

const HomePage = () => {
    const guestName = localStorage.getItem("guestName") || "";

    return (
        <GlassCard>
            <div className="flex w-full justify-between items-center">
            <p>Bienvenue <span
                className="capitalize">{guestName}</span> !</p>

            <Link to={"/add-photos"}
                  className="flex gap-1.5 px-3 items-center bg-white text-green-900 py-2 rounded-full font-semibold">
                <PlusIcon
                    className="size-4 shrink-0"/>Ajouter des photos</Link></div>
            <AlbumItemsList/>
        </GlassCard>
    )
}
export default HomePage;
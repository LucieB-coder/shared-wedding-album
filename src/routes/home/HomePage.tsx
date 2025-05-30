import {AddImageForm} from "./components/AddImageForm.tsx";
import {AlbumItemsList} from "./components/AlbumItemsList.tsx";

const HomePage = () => {
    const guestName = localStorage.getItem("guestName") || "";

    return (
        <div className="flex flex-1 w-full flex-col items-start backdrop-blur-2xl rounded-2xl p-3">
            <p className="text-white text-start backdrop-blur-[2px]">Bienvenue <span
                className="capitalize">{guestName}</span> !</p>
            <AddImageForm/>
            <AlbumItemsList/>
        </div>
    )
}
export default HomePage;
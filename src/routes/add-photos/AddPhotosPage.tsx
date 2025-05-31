import GlassCard from "../../components/GlassCard.tsx";
import {AddImageForm} from "./components/AddImageForm.tsx";
import GoBackButton from "../../components/GoBackButton.tsx";

const AddPhotosPage = () => {
    return (
        <>
            <div className="flex w-full px-3 items-start justify-start">
                <GoBackButton />
            </div>
            <GlassCard>
                <h2 className="text-2xl font-semibold">Ajoute des photos 📸</h2>
                <AddImageForm/>
            </GlassCard>
        </>
    )
}
export default AddPhotosPage;
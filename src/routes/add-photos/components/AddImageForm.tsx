import React, {useEffect, useState} from "react";
import {type MomentKey, MOMENTS} from "../../../api/images/types.ts";
import {useUploadImageMutation} from "../../../api/images/mutations.ts";
import ImageInput from "../../../components/form/ImageInput.tsx";
import {useNavigate} from "react-router-dom";

export const AddImageForm = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [moments, setMoments] = useState<MomentKey[]>([]);
    const uploadMutation = useUploadImageMutation();
    const navigate = useNavigate();

    const guestName = localStorage.getItem("guestName") || "";

    const handleFilesChange = (files: File[]) => {
        setFiles(files.slice(0, 10));
    };

    const handleMomentToggle = (key: MomentKey) => {
        setMoments((prev) =>
            prev.includes(key) ? prev.filter((m) => m !== key) : [...prev, key]
        );
    };

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        if (files.length === 0) return;

        return await Promise.all(files.map(async (file) => {
            return await uploadMutation.mutate({file, guestName, moments, createdAt: new Date()});
        }))

    };

    useEffect(() => {
        if (uploadMutation.isSuccess) {
            console.log("Successfully uploaded");
            setFiles([]);
            setMoments([]);
            navigate(`/`);
        }
    }, [uploadMutation.isSuccess]);

    return (
        <form
            onSubmit={handleSubmit}
        >
            <ImageInput onImageChanged={handleFilesChange} images={[]}/>
            <p className="text-sm text-white/70 pb-5">
                {files.length} image(s) sélectionnée(s) / max 10
            </p>

            <div className="space-y-2">
                <p className="font-medium">Quel(s) moment(s) ?</p>
                <div className="flex flex-wrap gap-2">
                    {Object.entries(MOMENTS).map(([key, label]) => (
                        <button
                            key={key}
                            type="button"
                            onClick={() => handleMomentToggle(key as MomentKey)}
                            className={`px-3 py-1 rounded-full border ${
                                moments.includes(key as MomentKey)
                                    ? " border-green-500 text-green-500"
                                    : "border-white/70"
                            }`}
                        >
                            {label}
                        </button>
                    ))}
                </div>
            </div>

            <button
                type="submit"
                disabled={uploadMutation.isPending}
                className="w-full bg-white text-green-900 py-2 px-3 rounded-full disabled:opacity-70 font-semibold my-4"
            >
                {uploadMutation.isPending ? "Envoi en cours...\n Ceci peut prendre quelques secondes" : "Ajouter les photos"}
            </button>

            {uploadMutation.isSuccess && (
                <p className="text-green-600 font-medium">Les photos on été ajoutées à l'album ✅</p>
            )}
            {uploadMutation.isError && (
                <p className="text-red-600">Erreur : {uploadMutation.error?.message}</p>
            )}
        </form>
    );
};

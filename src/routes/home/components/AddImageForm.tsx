import React, {useState} from "react";
import {type MomentKey, MOMENTS} from "../../../api/images/types.ts";
import {useUploadImageMutation} from "../../../api/images/mutations.ts";

export const AddImageForm = () => {
    const [files, setFiles] = useState<File[]>([]);
    const [moments, setMoments] = useState<MomentKey[]>([]);
    const uploadMutation = useUploadImageMutation();

    const guestName = localStorage.getItem("guestName") || "";

    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const selectedFiles = Array.from(e.target.files || []);
        setFiles(selectedFiles.slice(0, 10));
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

    return (
        <form
            onSubmit={handleSubmit}
            className="max-w-xl mx-auto p-6 bg-white rounded-xl shadow-md space-y-4"
        >
            <h2 className="text-2xl font-semibold">Uploader des photos 📸</h2>

            <input
                type="file"
                accept="image/*"
                multiple
                onChange={handleFileChange}
                className="w-full"
            />
            <p className="text-sm text-gray-500">
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
                                    ? "bg-green-100 border-green-500"
                                    : "bg-gray-100"
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
                className="w-full py-2 bg-green-600 text-white rounded hover:bg-green-700 disabled:opacity-50"
            >
                {uploadMutation.isPending ? "Envoi..." : "Envoyer les images"}
            </button>

            {uploadMutation.isSuccess && (
                <p className="text-green-600 font-medium">Upload réussi ✅</p>
            )}
            {uploadMutation.isError && (
                <p className="text-red-600">Erreur : {uploadMutation.error?.message}</p>
            )}
        </form>
    );
};

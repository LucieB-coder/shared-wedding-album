export const MOMENTS = {
    ceremony: "Cérémonie 💒",
    photoSession: "Séance photo 📸",
    dinner: "Repas 🍽️",
    dancefloor: "Dancefloor 🕺",
    lateNight: "Fin de soirée 😵‍💫",
} as const;

export type MomentKey = keyof typeof MOMENTS;
export type MomentLabel = (typeof MOMENTS)[MomentKey];


export type ImageUrls = {
    thumbnail?: string;
    compressed?: string;
    fullImage?: string;
}

export type AlbumItem = {
    id: string;
    guestName: string; // Guest who took the photo
    createdAt: Date; // Upload dateTime
    imageUrls: ImageUrls; // Image URLs
    moments?: MomentKey[]; // Moment of the wedding where the photo was taken
};
import slugify from "slugify";


interface RawRider {
    _id: string;
    identifier: { email: string; };
    identity: {
        fullName?: string;
        birthDate?: number;
        city?: string;
        country?: string;
    };
    preferences?: {
        sports?: string[];
    };
    currentSponsorSummary?: {
        currentSponsors?: string[];
    };
    images?: string[];
}

interface RiderDisplay {
    id: string;
    name: string;
    slug: string;
    email: string;
    birthDate?: number;
    sport: string[];
    location: string;
    images: string[];
    sponsors: string[];
    favorites: number;
    bio: string;
}

export function mapRiderToDisplay(r: RawRider): RiderDisplay {
    return {
        id: r._id,
        name: r.identity.fullName?.trim() || "Nom inconnu",
        slug: slugify(r.identity.fullName || r.identifier.email, { lower: true }),
        email: r.identifier.email,
        birthDate: r.identity.birthDate,
        sport: r.preferences?.sports || [],
        location: r.identity.city || r.identity.country || "Non renseigné",
        images: r.images || [],
        sponsors: r.currentSponsorSummary?.currentSponsors || [],
        favorites: 0,
        bio: "Athlète inscrit sur Kascad. Informations en cours de mise à jour.",
    };
}

// URL de l’API (adapter si besoin)
const API_URL = "http://localhost:1337/riders";

// Fonction pour récupérer tous les riders
export async function getRiders(): Promise<RiderDisplay[]> {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Erreur lors du chargement des riders");

    const raw: RawRider[] = await res.json();
    return raw.map(mapRiderToDisplay);
}

// Fonction pour récupérer un rider via son slug
export async function getRiderBySlug(slug: string): Promise<RiderDisplay | null> {
    const riders = await getRiders();
    return riders.find((r) => r.slug === slug) || null;
}
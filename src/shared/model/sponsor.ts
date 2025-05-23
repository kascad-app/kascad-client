import slugify from "slugify";
import type { Sponsor as DBSponsor } from "@kascad-app/shared-types";

// Type destiné au front
export interface SponsorDisplay {
    id: string;
    name: string;
    slug: string;
    logo?: string;
    website?: string;
    description: string;
    sports: string[];
    details: string;
}

// Transformation des données brutes (DB) vers données front
function mapSponsorToDisplay(sponsor: DBSponsor): SponsorDisplay {
    return {
        id: sponsor.identifier.email,
        name: sponsor.identity.companyName,
        slug: slugify(sponsor.identity.companyName, { lower: true }),
        logo: sponsor.identity.logo,
        website: sponsor.identity.website,
        description: `Sponsor actif dans : ${sponsor.preferences.sports.map((s) => s.name).join(", ")}`,
        sports: sponsor.preferences.sports.map((s) => s.name),
        details: "Sponsor engagé dans le développement des sports extrêmes à travers des partenariats solides et une vision durable.",
    };
}

// ⚠️ Remplace l'URL par l'endpoint réel de ton backend API
const API_URL = "http://localhost:3001/api/sponsors";

// Récupère tous les sponsors depuis l'API
export async function getSponsors(): Promise<SponsorDisplay[]> {
    const res = await fetch(API_URL, { cache: "no-store" });
    if (!res.ok) throw new Error("Erreur lors du chargement des sponsors depuis l'API");

    const rawSponsors: DBSponsor[] = await res.json();
    return rawSponsors.map(mapSponsorToDisplay);
}

// Récupère un sponsor spécifique via son slug
export async function getSponsorBySlug(slug: string): Promise<SponsorDisplay | null> {
    const sponsors = await getSponsors();
    return sponsors.find((s) => s.slug === slug) || null;
}
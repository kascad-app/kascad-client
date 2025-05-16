export interface Sponsor {
    id: string;
    name: string;
    logo: string;
    description: string;
    website: string;
    slug: string;
    sports: string[];
    details: string;
}

export async function getSponsors(): Promise<Sponsor[]> {
    const res = await fetch("http://localhost:3000/datas/sponsors.json", {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Erreur lors du chargement des sponsors");
    return res.json();
}

export async function getSponsorBySlug(slug: string): Promise<Sponsor | null> {
    const res = await fetch("/datas/sponsors.json");
    if (!res.ok) throw new Error("Erreur lors du chargement des sponsors");
    const sponsors: Sponsor[] = await res.json();
    return sponsors.find((sponsor) => sponsor.slug === slug) || null;
}

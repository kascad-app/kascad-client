export interface Proposition {
    id: string;
    name: string;
    logo?: string;
    message: string;
    sport: string;
    location: string;
    budget: string;
    perks: string[];
    description?: string;
    conditions?: string;
    rating?: number;
}

export async function getPropositions(): Promise<Proposition[]> {
    const res = await fetch("http://localhost:3000/datas/propositions.json", {
        cache: "no-store",
    });
    if (!res.ok) throw new Error("Erreur lors du chargement des propositions");
    return res.json();
}

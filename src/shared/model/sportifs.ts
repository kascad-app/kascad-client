export interface AthleteProfile {
    id: string;
    name: string;
    slug: string;
    sport: string;
    bio: string;
    age: number;
    location: string;
    image: string;
    videos: string[];
    images: string[];
    socials: {
        facebook: string;
        twitter: string;
        youtube: string;
        tiktok: string;
        instagram: string;
    };
    instagram: {
        username: string;
        description: string[];
        posts: string[];
    };
    sponsors: string[];
    favorites: number;
}

export async function getAthletes(): Promise<AthleteProfile[]> {
    const res = await fetch('http://localhost:3000/datas/athletes.json', {
        cache: 'no-store',
    });
    if (!res.ok) throw new Error('Erreur lors du chargement des sportifs');
    return res.json();
}

export async function getAthleteBySlug(slug: string): Promise<AthleteProfile | null> {
    const res = await fetch('/datas/athletes.json');
    if (!res.ok) throw new Error('Erreur lors du chargement des sportifs');
    const athletes: AthleteProfile[] = await res.json();
    return athletes.find((athlete) => athlete.slug === slug) || null;
}
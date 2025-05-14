import { promises as fs } from 'fs';
import path from 'path';
import SponsorCard from './SponsorCard';
import { Suspense } from 'react';

export default async function SponsorsPage() {
    const file = path.join(process.cwd(), 'public/datas/sponsors.json');
    const data = await fs.readFile(file, 'utf-8');
    const sponsors = JSON.parse(data);

    const sportsSet = new Set<string>();
    sponsors.forEach((s: any) => s.sports.forEach((sport: string) => sportsSet.add(sport)));
    const sports = Array.from(sportsSet);

    return (
        <div className="max-w-7xl mx-auto px-4 py-10">
            <h1 className="text-3xl font-bold mb-8">Nos Sponsors</h1>

            {/* Filtres */}
            <div className="flex flex-wrap items-center gap-4 mb-6">
                <select className="border rounded px-4 py-2 text-sm">
                    <option value="">Tous les sports</option>
                    {sports.map((sport) => (
                        <option key={sport} value={sport}>{sport}</option>
                    ))}
                </select>
                <button className="border rounded-full px-4 py-1 text-sm bg-white hover:bg-gray-50">❤️ Likés</button>
                <button className="border rounded-full px-4 py-1 text-sm bg-white hover:bg-gray-50">🔍 Nouveaux</button>
                <button className="border rounded-full px-4 py-1 text-sm bg-white hover:bg-gray-50">🔥 Populaires</button>
            </div>

            {/* Grille */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sponsors.map((sponsor: any) => (
                    <SponsorCard key={sponsor.id} sponsor={sponsor} />
                ))}
            </div>
        </div>
    );
}

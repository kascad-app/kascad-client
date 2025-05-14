'use client';
import Link from 'next/link';
import { useState } from 'react';

export default function SponsorCard({ sponsor }: { sponsor: any; }) {
    const [liked, setLiked] = useState(false);

    return (
        <div className="relative rounded-lg overflow-hidden shadow hover:shadow-md transition bg-white">
            <img
                src={sponsor.image}
                alt={sponsor.name}
                className="w-full h-40 object-cover grayscale"
            />
            <button
                onClick={() => setLiked(!liked)}
                className="absolute top-2 right-2 text-white"
            >
                {liked ? '❤️' : '🤍'}
            </button>
            <div className="p-4">
                <h3 className="font-bold text-lg mb-1">{sponsor.name}</h3>
                <p className="text-sm text-muted-foreground mb-2">{sponsor.location}</p>
                <div className="flex gap-2 flex-wrap text-xs mb-2">
                    <span className="px-2 py-1 bg-gray-100 rounded">{sponsor.type}</span>
                    <span className="px-2 py-1 bg-gray-100 rounded">{sponsor.level}</span>
                </div>
                <Link
                    href={`/sponsors/${sponsor.slug}`}
                    className="text-sm text-blue-600 hover:underline"
                >
                    Voir les détails →
                </Link>
            </div>
        </div>
    );
}
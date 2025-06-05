"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { useMemo, useState } from "react";
import { Sport, Language, SocialNetwork, Profile, Sponsor } from "@kascad-app/shared-types";
import { useGetSponsors } from "@/entities/sponsors/sponsors.hooks";
import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select";
import { Button } from "@/components/ui/button";
import { Heart } from "lucide-react";

export default function SponsorsPage() {
    const [search, setSearch] = useState("");
    const [selectedSport, setSelectedSport] = useState("Tous");
    const [showLikedOnly, setShowLikedOnly] = useState(false);
    const [likedSponsors, setLikedSponsors] = useState<string[]>([]);

    const { data: sponsors = [], isLoading, error } = useGetSponsors();
    const toggleLike = (slug: string) => {
        setLikedSponsors((prev) =>
            prev.includes(slug) ? prev.filter((id) => id !== slug) : [...prev, slug]
        );
    };
    const allSports = useMemo(() => {
        return [
            "Tous",
            ...new Set(
                sponsors.flatMap((s: Sponsor) => s.preferences?.sports?.map((sport) => sport.name) || [])
            ),
        ];
    }, [sponsors]);

    const filteredSponsors = useMemo(() => {
        return sponsors.filter((sponsor: Sponsor) => {
            const matchSearch = sponsor.identity.companyName
                .toLowerCase()
                .includes(search.toLowerCase());

            const sportNames = sponsor.preferences?.sports?.map((s) => s.name) || [];
            const matchSport = selectedSport === "Tous" || sportNames.includes(selectedSport);

            const matchLiked = !showLikedOnly || likedSponsors.includes(sponsor.identity.companyName);

            return matchSearch && matchSport && matchLiked;
        });
    }, [sponsors, search, selectedSport, showLikedOnly]);

    if (isLoading) {
        return <p className="p-8">Chargement des sponsors...</p>;
    }

    if (error) {
        return <p className="p-8 text-red-500">Erreur lors du chargement des sponsors.</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-6">Sponsors</h1>

            <div className="mb-8 flex flex-wrap gap-4 items-center">
                <input
                    type="text"
                    placeholder="Rechercher un sponsor..."
                    className="border px-4 py-2 rounded-md text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <Select value={selectedSport} onValueChange={setSelectedSport}>
                    <SelectTrigger className="w-[200px]">
                        <SelectValue placeholder="Choisir un sport" />
                    </SelectTrigger>
                    <SelectContent>
                        {allSports.map((sport) => (
                            <SelectItem key={sport} value={sport}>
                                {sport}
                            </SelectItem>
                        ))}
                    </SelectContent>
                </Select>

                <Button
                    variant={showLikedOnly ? "default" : "outline"}
                    onClick={() => setShowLikedOnly(!showLikedOnly)}
                >
                    <Heart className="w-4 h-4 mr-2" /> {showLikedOnly ? "Tous" : "Likés"}
                </Button>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {filteredSponsors.map((sponsor: Sponsor) => (
                    console.log("Sponsor:", sponsor._id),
                    <Link
                        key={sponsor.identity.companyName}
                        href={`/sponsors/${sponsor._id}`}
                        className="group relative rounded-xl overflow-hidden shadow-md border hover:shadow-xl transition-all"
                    >
                        <div className="relative w-full h-64">
                            <button
                                onClick={(e) => {
                                    e.preventDefault(); // pour ne pas activer le <Link>
                                    toggleLike(sponsor.identity.companyName);
                                }}
                                className="absolute top-3 right-3 z-10"
                            >
                                <Heart
                                    className={`w-6 h-6 ${likedSponsors.includes(sponsor.identity.companyName)
                                        ? "text-red-500 fill-red-500"
                                        : "text-gray-400"
                                        }`}
                                />
                            </button>
                            <Image
                                src={sponsor.identity.logo || "/assets/img/blog-6.jpg"}
                                alt={sponsor.identity.companyName}
                                fill
                                className="object-cover"
                            />
                            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-white via-white/60 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    {sponsor.identity.companyName}
                                </h3>
                                <p className="text-xs text-gray-600">
                                    {sponsor.preferences?.sports?.map((s) => s.name).join(", ") || "Sport inconnu"}
                                </p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}

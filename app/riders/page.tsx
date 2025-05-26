"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { useMemo, useState } from "react";
import { useGetRiders } from "@/entities/riders/riders.hooks";
import { Rider } from "@kascad-app/shared-types";

export default function RidersPage() {
    const [search, setSearch] = useState("");
    const [selectedSport, setSelectedSport] = useState("Tous");

    const { data: riders = [], isLoading, error } = useGetRiders();

    const allSports = useMemo(() => {
        return [
            "Tous",
            ...new Set(
                riders
                    .flatMap((r: Rider) => r.preferences?.sports || [])
                    .map((sport) => sport.name)
            ),
        ];
    }, [riders]);

    const filteredRiders = useMemo(() => {
        return riders.filter((r: Rider) => {
            const fullName =
                r.identity.fullName ||
                `${r.identity.firstName} ${r.identity.lastName}`;
            const matchSearch = fullName
                .toLowerCase()
                .includes(search.toLowerCase());

            const sports = r.preferences?.sports?.map((s) => s.name) || [];
            const matchSport =
                selectedSport === "Tous" || sports.includes(selectedSport);

            return matchSearch && matchSport;
        });
    }, [riders, search, selectedSport]);

    if (isLoading && riders.length === 0) {
        return <p className="p-8">Chargement des riders...</p>;
    }

    if (error) {
        return <p className="p-8 text-red-500">Erreur lors du chargement des riders.</p>;
    }

    return (
        <div className="max-w-7xl mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-6">Riders</h1>

            <div className="mb-8 flex flex-wrap gap-4 items-center">
                <input
                    type="text"
                    placeholder="Rechercher un rider..."
                    className="border px-4 py-2 rounded-md text-sm"
                    value={search}
                    onChange={(e) => setSearch(e.target.value)}
                />

                <select
                    className="border px-4 py-2 rounded-md text-sm"
                    value={selectedSport}
                    onChange={(e) => setSelectedSport(e.target.value)}
                >
                    {allSports.map((sport) => (
                        <option key={sport} value={sport}>
                            {sport}
                        </option>
                    ))}
                </select>
            </div>

            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
                {filteredRiders.map((rider: Rider) => {
                    const fullName =
                        rider.identity.fullName ||
                        `${rider.identity.firstName} ${rider.identity.lastName}`;
                    const sportName =
                        rider.preferences?.sports?.[0]?.name || "Sport inconnu";

                    return (
                        <Link
                            key={rider.identifier.slug}
                            href={`/riders/${rider.identifier.slug}`}
                            className="group relative rounded-xl overflow-hidden shadow-md border hover:shadow-xl transition-all"
                        >
                            <div className="relative w-full h-64">
                                <Image
                                    src={rider.images?.[0]?.url || "/assets/img/blog-6.jpg"}
                                    alt={fullName}
                                    fill
                                    className="object-cover"
                                />
                                <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-white via-white/60 to-transparent" />
                                <div className="absolute bottom-4 left-4">
                                    <h3 className="text-sm font-semibold text-gray-900">
                                        {fullName}
                                    </h3>
                                    <p className="text-xs text-gray-600">{sportName}</p>
                                </div>
                            </div>
                        </Link>
                    );
                })}
            </div>
        </div>
    );
}

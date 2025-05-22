"use client";

import Link from "next/link";
import Image from "next/image";
import * as React from "react";
import { useEffect, useState } from "react";
import { getRiders } from "@/shared/model/riders";

export default function RidersPage() {
    const [riders, setRiders] = useState([]);
    const [search, setSearch] = useState("");
    const [selectedSport, setSelectedSport] = useState("Tous");

    useEffect(() => {
        async function fetchRiders() {
            const data = await getRiders();
            setRiders(data);
        }

        fetchRiders();
    }, []);

    const allSports = ["Tous", ...new Set(riders.map((r: any) => r.sport).filter(Boolean))];

    const filteredRiders = riders.filter((r: any) => {
        const matchSearch = r.name.toLowerCase().includes(search.toLowerCase());
        const matchSport = selectedSport === "Tous" || r.sport === selectedSport;
        return matchSearch && matchSport;
    });

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
                {filteredRiders.map((rider: any) => (
                    <Link
                        key={rider.id}
                        href={`/riders/${rider.slug}`}
                        className="group relative rounded-xl overflow-hidden shadow-md border hover:shadow-xl transition-all"
                    >
                        <div className="relative w-full h-64">
                            {/* <Image
                                src={rider.image || "/default-profile.jpg"}
                                alt={rider.name}
                                fill
                                className="object-cover"
                            /> */}
                            <Image
                                src={"/assets/img/blog-6.jpg"}
                                alt={rider.name}
                                fill
                                className="object-cover"
                            // onError={(e) => {
                            //     const target = e.currentTarget as HTMLImageElement;
                            //     target.src = "./assets/img/blog-6.jpg";
                            // }}
                            />
                            <div className="absolute bottom-0 w-full h-1/2 bg-gradient-to-t from-white via-white/60 to-transparent" />
                            <div className="absolute bottom-4 left-4">
                                <h3 className="text-sm font-semibold text-gray-900">
                                    {rider.name}
                                </h3>
                                <p className="text-xs text-gray-600">{rider.sport}</p>
                            </div>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
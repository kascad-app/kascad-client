// pages/riders/index.tsx
"use client";

import Image from "next/image";
import Link from "next/link";
import * as React from "react";
import { useMemo, useState } from "react";
import { useGetRiders } from "@/entities/riders/riders.hooks";
import { Rider, SportName } from "@kascad-app/shared-types";
import { ROUTES } from "@/shared/constants/ROUTES";

export default function RidersPage() {
  const [search, setSearch] = useState("");
  const [selectedSport, setSelectedSport] = useState("Tous");

  const { data: riders = [], isLoading, error } = useGetRiders();

  const allSports = useMemo(() => {
    return ["Tous", ...Object.values(SportName)];
  }, []);

  const filteredRiders = useMemo(() => {
    return riders.filter((r: Rider) => {
      const fullName =
        r.identity.fullName || `${r.identity.firstName} ${r.identity.lastName}`;
      const matchSearch = fullName.toLowerCase().includes(search.toLowerCase());

      const sports = r.preferences?.sports?.map((s) => s.name) || [];
      const matchSport =
        selectedSport === "Tous" ||
        sports.includes(
          selectedSport as Rider["preferences"]["sports"][number]["name"],
        );

      return matchSearch && matchSport;
    });
  }, [riders, search, selectedSport]);

  if (isLoading && riders.length === 0) {
    return <p className="p-8 text-black">Chargement des riders...</p>;
  }

  if (error) {
    return (
      <p className="p-8 text-red-500">Erreur lors du chargement des riders.</p>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-black px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center mb-10">
        <input
          type="text"
          placeholder="Rechercher un rider..."
          className="border px-4 py-2 rounded-md text-sm w-full sm:w-auto"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select
          className="border px-4 py-2 rounded-md text-sm w-full sm:w-auto"
          value={selectedSport}
          onChange={(e) => setSelectedSport(e.target.value)}
        >
          {allSports.map((sport) => (
            <option value={sport}>
              {sport}
            </option>
          ))}
        </select>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredRiders.map((rider: Rider, index) => {
          const fullName =
            rider.identity.fullName ||
            `${rider.identity.firstName} ${rider.identity.lastName}`;
          const sports = rider.preferences?.sports?.map((s) => s.name) || [];
          const bio = rider.identity.bio || "Pas de bio disponible.";
          const image = rider.avatarUrl || "/assets/img/blog-4.jpg";

          return (
            <Link
              key={index}
              href={ROUTES.RIDERS.DETAIL(rider.identifier.slug)}
              className="block"
            >
              <div className="flex flex-col sm:flex-row items-center bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="relative w-full sm:w-1/2 h-[250px]">
                  <Image
                    src={image}
                    alt={fullName}
                    fill
                    className="object-cover"
                  />
                </div>
                <div className="p-4 w-full sm:w-1/2">
                  <h2 className="text-lg font-semibold font-michroma mb-1">
                    {fullName}
                  </h2>
                  <p className="text-xs uppercase tracking-wide text-blue-600 mb-2">
                    {sports.join(", ")}
                  </p>
                  <p className="text-sm text-gray-700 line-clamp-4 whitespace-pre-line">
                    {bio}
                  </p>
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </div>
  );
}

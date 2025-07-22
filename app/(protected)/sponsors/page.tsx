"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Sport, Sponsor } from "@kascad-app/shared-types";
import { useGetSponsors } from "@/entities/sponsors/sponsors.hooks";
import SponsorCard from "./SponsorCard";

export default function SponsorsPage() {
  const { data: sponsors = [], isLoading, error } = useGetSponsors();

  if (isLoading) {
    return <p className="p-8 text-black">Chargement des sponsors...</p>;
  }

  if (error) {
    return (
      <p className="p-8 text-red-500">
        Erreur lors du chargement des sponsors.
      </p>
    );
  }

  const sortedByRecent = [...sponsors]
    .filter((sponsor: any) => sponsor.createdAt)
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  const recentSponsors = sortedByRecent.slice(0, 2);
  const recentSlugsOrIds = new Set(
    recentSponsors.map((sponsor: any) => sponsor.slug || sponsor.id),
  );
  const originalSponsors = sponsors.filter(
    (sponsor: any) =>
      !recentSlugsOrIds.has(sponsor.slug) && !recentSlugsOrIds.has(sponsor.id),
  );

  return (
    <div className="w-full min-h-screen bg-white text-black px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Nos sponsors</h1>
      {recentSponsors.length > 0 && (
        <div className="mb-10">
          <h2 className="text-2xl font-bold mb-4">
            Nous ont rejoint récemment
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {recentSponsors.map((sponsor: any) => (
              <SponsorCard key={sponsor.slug || sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </div>
      )}
      {originalSponsors.length > 0 && (
        <>
          <h2 className="text-2xl font-bold mb-4">
            Nous font confiance depuis longtemps
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {originalSponsors.map((sponsor: any) => (
              <SponsorCard key={sponsor.slug || sponsor.id} sponsor={sponsor} />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

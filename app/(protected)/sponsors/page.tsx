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

  return (
    <div className="w-full min-h-screen bg-white text-black px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Nos sponsors</h1>
      <div className="grid grid-cols-1 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-6">
        {sponsors.map((sponsor: any) => (
          <SponsorCard key={sponsor.slug || sponsor.id} sponsor={sponsor} />
        ))}
      </div>
    </div>
  );
}

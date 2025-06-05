"use client";

import { useParams } from "next/navigation";
import Image from "next/image";
import { useGetSponsor } from "@/entities/sponsors/sponsors.hooks";
import { Button } from "@/shared/ui/button/Button.ui";


export default function SponsorPage() {
  const { companyName } = useParams();
  const { data: sponsor, isLoading, error } = useGetSponsor(companyName as string);
  console.log("Sponsor data:", sponsor);
  if (isLoading) return <p className="p-8">Chargement...</p>;
  if (error || !sponsor) return <p className="p-8 text-red-500">Sponsor introuvable.</p>;

  return (
    <div className="max-w-5xl mx-auto px-4 py-16">
      <div className="relative space-y-10">
        <div className="flex items-center gap-6">
          <Image
            src={sponsor.identity.logo || "/assets/img/blog-6.jpg"}
            alt={sponsor.identity.companyName}
            width={80}
            height={80}
            className="object-contain"
          />
          <div>
            <h1 className="text-4xl font-bold text-black">{sponsor.identity.companyName}</h1>
            <p className="text-gray-500 text-sm">{sponsor.description}</p>
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {sponsor.preferences?.sports?.map((sport) => (
            <span
              key={sport.name}
              className="text-xs bg-gray-100 px-3 py-1 rounded-full border"
            >
              {sport.name}
            </span>
          ))}
        </div>

        <p className="text-gray-700 text-sm leading-relaxed max-w-3xl">
          {sponsor.description || "Aucune description disponible."}
        </p>

        <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6 bg-white border p-6 rounded-lg ">
          {sponsor.identity.website && (
            <div>
              <p className="text-xs text-gray-500 mb-1">Site Web</p>
              <a
                href={sponsor.identity.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                Voir le site →
              </a>
            </div>
          )}

          {/* {sponsor.preferences?.networks?.map((net) => (
            <div key={net.name}>
              <p className="text-xs text-gray-500 mb-1">{net.name}</p>
              <a
                href={net.link}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-blue-600 hover:underline"
              >
                {net.link}
              </a>
            </div>
          ))} */}
        </div>

        <div className="flex gap-4 mt-6 items-center">
          <Button variant="secondary">❤️ Ajouter à mes favoris</Button>
          <Button variant="outline">📩 Contacter</Button>
        </div>

        <div className="absolute top-0 right-1/2 opacity-5 text-[16rem] text-nowrap translate-x-1/2 font-black tracking-tighter select-none pointer-events-none">
          {sponsor.identity.companyName.toUpperCase()}
        </div>
      </div>
    </div>
  );
}
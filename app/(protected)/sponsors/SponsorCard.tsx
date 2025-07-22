"use client";
import Link from "next/link";
import { useState } from "react";
import Avatar from "@/widgets/avatar/avatar.ui";
import { Span } from "next/dist/trace";

export default function SponsorCard({ sponsor }: { sponsor: any }) {
  const sponsorName = sponsor.identity.companyName.toLowerCase();
  const sportNames =
    sponsor.preferences?.sports?.map(
      (sponsorSport: any) => sponsorSport.name,
    ) || [];

  return (
    <Link
      href={`/sponsors/${sponsor.slug}`}
      className="block relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white h-full focus:outline-none focus:ring-2 focus:ring-blue-500"
      tabIndex={0}
    >
      <div className="w-full h-32 bg-gray-50 flex items-center justify-center relative overflow-hidden">
        <img
          src={sponsor.avatarUrl || "/assets/img/blog-6.jpg"}
          alt={sponsorName}
          className="w-32 h-32 z-[2] object-contain"
        />
        <div className="absolute top-0 left-0 z-[1] w-full h-full flex flex-col items-center justify-center pointer-events-none">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="flex flex-row w-full justify-center">
              {Array.from({ length: 10 }).map((_, y) => (
                <span
                  key={y}
                  className="text-gray-200 font-black mx-1 select-none"
                >
                  {sportNames.length > 0 ? sportNames.join(" ") : sponsorName}
                </span>
              ))}
            </div>
          ))}
        </div>
      </div>
      <div className="p-4">
        <h3 className="font-bold text-lg mb-1 truncate">{sponsorName}</h3>
        <div className="flex gap-2 flex-wrap text-xs mb-2">
          {sportNames.length > 0 ? (
            sportNames.join(", ")
          ) : (
            <span className="italic font-figtree text-gray-400">
              Ce sponsor n'a pas de sports renseigné
            </span>
          )}
        </div>
        <div className="flex gap-2 flex-wrap text-xs mb-2">
          {sponsor.location ? (
            sponsor.location
          ) : (
            <span className="italic font-figtree text-gray-400">
              Ce sponsor n'a pas de localisation renseignée
            </span>
          )}
        </div>
        <div className="flex gap-2 flex-wrap text-xs mb-2">
          {sponsor.description ? (
            sponsor.description.length > 30 ? (
              sponsor.description.slice(0, 30) + "…"
            ) : (
              sponsor.description
            )
          ) : (
            <span className="italic font-figtree text-gray-400">
              Ce sponsor n'a pas de description renseignée
            </span>
          )}
        </div>
        <div className="flex gap-2 flex-wrap text-xs mb-2">
          {sponsor.level ? (
            sponsor.level
          ) : (
            <span className="italic font-figtree text-gray-400">
              Ce sponsor n'a pas de niveau renseigné
            </span>
          )}
        </div>
      </div>
    </Link>
  );
}

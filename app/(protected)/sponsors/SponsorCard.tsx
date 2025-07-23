"use client";
import Link from "next/link";
import { useState } from "react";
import Avatar from "@/widgets/avatar/avatar.ui";
import { Span } from "next/dist/trace";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";

export default function SponsorCard({ sponsor }: { sponsor: any }) {
  const sponsorName = sponsor.identity.companyName.toLowerCase();
  const sportNames =
    sponsor.preferences?.sports?.map(
      (sponsorSport: any) => sponsorSport.name,
    ) || [];
  const [open, setOpen] = useState(false);

  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        className="block relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white h-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(true);
        }}
        role="button"
        aria-label={`Voir les détails de ${sponsorName}`}
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
      </div>
      <DialogContent className="w-[90vw] max-w-2xl md:max-w-3xl lg:max-w-4xl h-[90vh] overflow-y-auto p-8 bg-white rounded-xl">
        <DialogHeader>
          <DialogTitle className="text-3xl font-bold text-black mb-2">
            {sponsor.identity?.companyName || sponsorName}
          </DialogTitle>
          <div className="flex flex-row md:items-start gap-4 w-full">
            <img
              src={sponsor.avatarUrl || "/assets/img/blog-6.jpg"}
              alt={sponsorName}
              className="w-32 h-32 z-[2] object-contain"
            />
            <div>
              <h4 className="font-semibold text-lg mb-1">Description</h4>
              <p className="text-gray-700 text-base">
                {sponsor.description || (
                  <span className="italic text-gray-400">
                    Aucune description disponible.
                  </span>
                )}
              </p>
            </div>
          </div>
        </DialogHeader>
        <div className="flex flex-col md:flex-row gap-8">
          
          <div className="space-y-4">
            <div className="text-sm text-gray-500">
              {sponsor.location || (
                <span className="italic">Aucune localisation renseignée</span>
              )}
            </div>
            <div className="flex flex-wrap gap-2 mt-2">
              {sportNames.length > 0 ? (
                sportNames.map((sport: string, i: number) => (
                  <span
                    key={i}
                    className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded"
                  >
                    {sport}
                  </span>
                ))
              ) : (
                <span className="italic text-gray-400">
                  Aucun sport renseigné
                </span>
              )}
            </div>
            {sponsor.website && (
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline mt-2 text-xs"
              >
                {sponsor.website}
              </a>
            )}
            {sponsor.values && sponsor.values.length > 0 && (
              <div>
                <h4 className="font-semibold text-lg mb-1">Valeurs</h4>
                <ul className="list-disc list-inside text-gray-700">
                  {sponsor.values.map((value: string, i: number) => (
                    <li key={i}>{value}</li>
                  ))}
                </ul>
              </div>
            )}
            {sponsor.athletes && sponsor.athletes.length > 0 && (
              <div>
                <h4 className="font-semibold text-lg mb-1">Athlètes</h4>
                <ul className="flex flex-wrap gap-2">
                  {sponsor.athletes.map((athlete: any, i: number) => (
                    <li
                      key={i}
                      className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1"
                    >
                      {athlete.image && (
                        <img
                          src={athlete.image}
                          alt={athlete.name}
                          className="w-6 h-6 rounded-full object-cover"
                        />
                      )}
                      <span>{athlete.name}</span>
                    </li>
                  ))}
                </ul>
              </div>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

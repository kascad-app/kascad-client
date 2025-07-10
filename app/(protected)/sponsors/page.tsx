"use client";

import Image from "next/image";
import Link from "next/link";
import { useMemo, useState } from "react";
import { Sport, Sponsor } from "@kascad-app/shared-types";
import { useGetSponsors } from "@/entities/sponsors/sponsors.hooks";
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
        sponsors.flatMap(
          (s: Sponsor) =>
            s.preferences?.sports?.map((sport) => sport.name) || []
        )
      ),
    ];
  }, [sponsors]);

  const filteredSponsors = useMemo(() => {
    return sponsors.filter((sponsor: Sponsor) => {
      const name = sponsor.identity.companyName.toLowerCase();
      const sportNames = sponsor.preferences?.sports?.map((s) => s.name) || [];

      const matchSearch = name.includes(search.toLowerCase());
      const matchSport =
        selectedSport === "Tous" ||
        sportNames.includes(selectedSport as Sport["name"]);
      const matchLiked =
        !showLikedOnly || likedSponsors.includes(sponsor.identity.companyName);

      return matchSearch && matchSport && matchLiked;
    });
  }, [sponsors, search, selectedSport, showLikedOnly]);

  if (isLoading) {
    return <p className="p-8 text-black">Chargement des sponsors...</p>;
  }

  if (error) {
    return (
      <p className="p-8 text-red-500">Erreur lors du chargement des sponsors.</p>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-black px-4 sm:px-6 py-10">
      <div className="flex flex-col sm:flex-row flex-wrap gap-4 items-center justify-center mb-10">
        <input
          type="text"
          placeholder="Rechercher un sponsor..."
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
            <option key={sport} value={sport}>
              {sport}
            </option>
          ))}
        </select>

        <button
          className={`px-4 py-2 rounded-md text-sm border flex items-center gap-2 ${showLikedOnly
            ? "bg-black text-white"
            : "bg-white text-black border-gray-300"
            }`}
          onClick={() => setShowLikedOnly(!showLikedOnly)}
        >
          <Heart className="w-4 h-4" />
          {showLikedOnly ? "Tous" : "Likés"}
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        {filteredSponsors.map((sponsor: Sponsor) => {
          const name = sponsor.identity.companyName;
          const sports = sponsor.preferences?.sports?.map((s) => s.name) || [];
          const logo = sponsor.identity.logo || "/assets/img/blog-6.jpg";

          return (
            <Link
              key={sponsor._id}
              href={`/sponsors/${sponsor._id}`}
              className="block"
            >
              <div className="flex flex-col sm:flex-row items-center bg-gray-100 rounded-xl overflow-hidden shadow-sm hover:shadow-md transition-all">
                <div className="relative w-full sm:w-1/2 h-[250px]">
                  <Image
                    src={logo}
                    alt={name}
                    fill
                    className="object-cover"
                  />
                  <button
                    onClick={(e) => {
                      e.preventDefault();
                      toggleLike(name);
                    }}
                    className="absolute top-3 right-3 z-10"
                  >
                    <Heart
                      className={`w-6 h-6 ${likedSponsors.includes(name)
                        ? "text-red-500 fill-red-500"
                        : "text-gray-400"
                        }`}
                    />
                  </button>
                </div>
                <div className="p-4 w-full sm:w-1/2">
                  <h2 className="text-lg font-semibold font-michroma mb-1">
                    {name}
                  </h2>
                  <p className="text-xs uppercase tracking-wide text-blue-600 mb-2">
                    {sports.join(", ") || "Sport inconnu"}
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

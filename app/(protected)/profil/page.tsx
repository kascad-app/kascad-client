"use client";

import { useSession } from "@/shared/context/SessionContext";
import { useState } from "react";
import {
  RiderIdentity,
  Image as RiderImage,
  PerformanceSummary,
} from "@kascad-app/shared-types";
import { Trophy, ImageIcon } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@components/ui/skeleton";
import Avatar from "@/widgets/avatar/avatar.ui";
import { getUserNetworksWithInfo } from "../../../src/shared/utils/networks/socialNetworks.utils";
import { ROUTES } from "@/shared/constants/ROUTES";
import {
  getWeatherIcon,
  getWeatherLabel,
} from "@/shared/utils/weather/weather.utils";

export default function ProfileComponent() {
  const session = useSession();
  const [visibleImages, setVisibleImages] = useState(4);
  const [showAllYoutubeVideos, setShowAllYoutubeVideos] = useState(false);

  if (session.loading || !session.user) {
    return <Skeleton className="w-full h-[500px] rounded-xl" />;
  }

  const identity = session.user.identity as RiderIdentity;
  const performances = session.user.performanceSummary as PerformanceSummary;
  const stats = performances.performances || [];
  const podiums = performances.totalPodiums || [];
  const getRankingBadge = (ranking?: number) => {
    if (!ranking) return null;
    if (ranking === 1)
      return <span className="text-yellow-400 font-bold">🥇</span>;
    if (ranking === 2)
      return <span className="text-gray-300 font-bold">🥈</span>;
    if (ranking === 3)
      return <span className="text-orange-400 font-bold">🥉</span>;
    return <span className="text-white font-semibold">{ranking}ᵉ</span>;
  };
  const formatDate = (date: Date | string) => {
    const dateObj = typeof date === "string" ? new Date(date) : date;
    return dateObj.toLocaleDateString("fr-FR");
  };
  const fullName =
    identity.fullName || `${identity.firstName} ${identity.lastName}`;
  const birthDate = identity.birthDate ? new Date(identity.birthDate) : null;

  // Fonction pour convertir une URL YouTube en URL d'embed
  const getYouTubeEmbedUrl = (url: string): string => {
    const regex =
      /(?:youtube\.com\/(?:[^\/]+\/.+\/|(?:v|e(?:mbed)?)\/|.*[?&]v=)|youtu\.be\/)([^"&?\/\s]{11})/;
    const match = url.match(regex);
    if (match) {
      const videoId = match[1];
      return `https://www.youtube.com/embed/${videoId}`;
    }
    return url; // Retourne l'URL originale si pas de match
  };

  const age: number = birthDate
    ? new Date().getFullYear() -
    birthDate.getFullYear() -
    (new Date().getMonth() < birthDate.getMonth() ||
      (new Date().getMonth() === birthDate.getMonth() &&
        new Date().getDate() < birthDate.getDate())
      ? 1
      : 0)
    : 0;

  const bio =
    session.user.identity.bio ||
    "Ce rider n'a pas encore renseigné sa biographie.";

  const images: RiderImage[] = session.user.images || [];

  return (
    <div className=" mx-auto px-21 py-[5rem] pt-40 overflow-x-hidden">
      <p className="text-[16rem] text-gray-100 fixed top-[20%] left-3/5 -translate-x-1/2 -z-1 text-nowrap uppercase font-black">
        {fullName}
      </p>
      <div className="flex justify-between items-start flex-wrap gap-6 mb-12">
        <div className="flex gap-14 items-start">
          <Avatar src={session.user.avatarUrl}></Avatar>
          <div className="flex flex-col gap-2">
            <h1 className="text-3xl font-bold tracking-tight font-michroma">
              {fullName}
            </h1>
            <p className="text-sm font-figtree">
              {session.user.identity.city ? (
                <span className="text-gray-400">
                  {session.user.identity.city}
                </span>
              ) : (
                <span className="italic font-figtree text-gray-400">
                  Ville non renseignée
                </span>
              )}
              {" · "}
              {session.user.identity.country ? (
                <span className="text-gray-400">
                  {session.user.identity.country}
                </span>
              ) : (
                <span className="italic font-figtree text-gray-400">
                  Pays non renseigné
                </span>
              )}
            </p>

            <p className="text-sm font-figtree">
              {age > 0 ? (
                `${age} ans`
              ) : (
                <span className="italic font-figtree text-gray-400">
                  Date de naissance non renseignée
                </span>
              )}
            </p>

            <p className="text-sm font-figtree">
              {session.user.identifier.phoneNumber ? (
                session.user.identifier.phoneNumber
              ) : (
                <span className="italic font-figtree text-gray-400">
                  Numéro de tel non renseigné
                </span>
              )}
            </p>

            <p className="text-sm font-figtree">
              {session.user.identifier.email ? (
                session.user.identifier.email
              ) : (
                <span className="italic font-figtree text-gray-400">
                  Email non renseigné
                </span>
              )}
            </p>
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={ROUTES.RIDER.EDIT_PROFILE}>
            <Button variant="outline">Modifier le profil</Button>
          </Link>
        </div>
      </div>

      <Card className="mb-10 bg-[#1a1a19] text-white border-none">
        <CardHeader>
          <CardTitle>Biographie</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-line">{bio}</p>
        </CardContent>
      </Card>

      {images.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Ma galerie d'images</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {images.slice(0, visibleImages).map((img, i) => (
              <Image
                key={i}
                src={img.url}
                alt={img.alt || `Image ${i + 1}`}
                width={600}
                height={400}
                className="rounded-lg object-cover aspect-video"
              />
            ))}
          </div>
          <div className="mt-6 text-center">
            {visibleImages < images.length && (
              <Button onClick={() => setVisibleImages((v) => v + 4)}>
                Voir plus d'images
              </Button>
            )}
            {visibleImages >= images.length && (
              <Button variant="outline" onClick={() => setVisibleImages(4)}>
                Réinitialiser
              </Button>
            )}
          </div>
        </section>
      )}

      {session.user.preferences.networks.length > 0 && (
        <section className="mb-12">
          <h2 className="text-2xl font-semibold mb-4">Réseaux sociaux</h2>
          <div className="flex gap-3 flex-wrap">
            {getUserNetworksWithInfo(session.user.preferences.networks).map(
              ({ network, info }) => (
                <div
                  key={network}
                  className={`inline-flex items-center gap-2 px-4 py-2 rounded-lg shadow-lg hover:shadow-xl transition-all duration-300 transform hover:scale-105 bg-[#101B08] text-white cursor-pointer`}
                >
                  {info.icon}
                  <span className="text-sm font-medium">{info.name}</span>
                </div>
              ),
            )}
          </div>
        </section>
      )}

      <section className="mb-12">
        <h2 className="text-2xl font-semibold mb-4">Langues parlées</h2>
        <div className="flex gap-4 flex-wrap">
          {session.user.identity?.languageSpoken &&
            session.user.identity.languageSpoken.length > 0 ? (
            session.user.identity.languageSpoken.map((lang, i) => (
              <span
                key={i}
                className="inline-flex items-center gap-1 text-sm font-medium border border-[#3F4139] px-3 py-1 rounded-full bg-gray-50 text-[#3F4139] shadow-sm hover:bg-blue-100 transition-colors"
              >
                <svg
                  className="w-4 h-4 text-[#3F4139]"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                  aria-hidden="true"
                >
                  <circle cx="10" cy="10" r="8" />
                </svg>
                {lang}
              </span>
            ))
          ) : (
            <span className="italic text-sm font-figtree text-gray-400">
              Aucune langue
            </span>
          )}
        </div>
      </section>

      <section className="mb-12 relative">
        <h2 className="text-2xl font-semibold mb-4">Images</h2>
        {session.user.images && session.user.images.length > 0 ? (
          <div></div>
        ) : (
          <div className="text-center py-12 bg-[#1a1a19] text-white rounded-xl">
            <ImageIcon className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-lg">Aucune image enregistrée</p>
            <p className="text-sm text-gray-400">
              Ce rider n'a pas encore partagé ses images.
            </p>
          </div>
        )}
      </section>

      <section className="mb-12 relative">
        <h2 className="text-2xl font-semibold mb-4">Vidéos YouTube</h2>

        {session.user.videos && session.user.videos.length > 0 ? (
          <div
            className={`grid grid-cols-1 md:grid-cols-2 gap-6 relative transition-all duration-700 ${!showAllYoutubeVideos ? "max-h-[50vh] overflow-hidden" : ""
              }`}
          >
            {session.user.videos.map((video, i) => (
              <div
                key={i}
                className="rounded-xl overflow-hidden aspect-video shadow-lg"
              >
                <iframe
                  src={getYouTubeEmbedUrl(video.url)}
                  className="w-full h-full"
                  title={video.title || `Vidéo YouTube ${i + 1}`}
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}

            {!showAllYoutubeVideos && session.user.videos.length > 4 && (
              <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
            )}
          </div>
        ) : (
          <p className="italic text-sm font-figtree text-gray-400">
            Aucune vidéo
          </p>
        )}

        {session.user.videos && session.user.videos.length > 4 && (
          <div className="mt-6 text-center z-20 relative">
            <Button onClick={() => setShowAllYoutubeVideos((prev) => !prev)}>
              {showAllYoutubeVideos ? "Voir moins" : "Voir plus"}
            </Button>
          </div>
        )}
      </section>

      <section className="mb-12 relative">
        <h2 className="text-2xl font-semibold mb-4">Résumé des Performances</h2>
        <div className="mt-8 max-w-6xl mx-auto">
          {performances && performances.performances.length > 0 ? (
            <div className="mb-10 flex flex-col gap-4 text-[#B1BD93] text-sm">
              <Trophy className="w-5 h-5" />
              <p className="uppercase tracking-wide">
                Total podiums :{" "}
                <span className="text-[#101B08] font-bold">
                  {performances.totalPodiums}
                </span>
              </p>
              <div className="relative w-full border-l-4 border-[#D2FA52] pl-6 space-y-12">
                {stats.map((performance, index) => (
                  <div key={index} className="relative group">
                    <div className="absolute -left-[2.25rem] top-1 w-5 h-5 bg-[#101B08] rounded-full group-hover:scale-125 transition-transform" />

                    <div className="bg-[#101B08] w-full text-white p-6 rounded-lg shadow-md group-hover:shadow-lg transition-all">
                      <div className="flex items-center justify-between mb-2">
                        <h4 className="text-xl font-bold flex items-center gap-2">
                          {getRankingBadge(performance.ranking)}
                          {performance.eventName}
                        </h4>
                        <span className="text-xs opacity-60 font-mono">
                          {formatDate(performance.startDate)}
                        </span>
                      </div>
                      <p className="text-[#B1BD93] text-sm mb-1">
                        {performance.category} — {performance.sport.name}
                      </p>
                      <p className="text-sm text-gray-300">
                        {performance.location.city},{" "}
                        {performance.location.country}
                      </p>

                      {performance.weather && (
                        <p className="text-xs text-gray-400 mt-2">
                          {getWeatherIcon(performance.weather)}{" "}
                          {getWeatherLabel(performance.weather)}
                        </p>
                      )}

                      {performance.notes && (
                        <div className="mt-3 text-sm text-gray-300">
                          <p className="font-semibold text-[#D2FA52] mb-1">
                            Notes :
                          </p>
                          <p>{performance.notes}</p>
                        </div>
                      )}
                    </div>
                  </div>
                ))}
              </div>
            </div>
          ) : (
            <div className="text-center py-12 bg-[#1a1a19] text-white rounded-xl">
              <Trophy className="w-12 h-12 text-gray-500 mx-auto mb-4" />
              <p className="text-lg">Aucune performance enregistrée</p>
              <p className="text-sm text-gray-400">
                Ce rider n'a pas encore partagé ses résultats.
              </p>
            </div>
          )}
        </div>
      </section>
    </div>
  );
}

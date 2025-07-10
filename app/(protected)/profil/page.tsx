"use client";

import { useSession } from "@/shared/context/SessionContext";
import { useState } from "react";
import { RiderIdentity, Image as RiderImage } from "@kascad-app/shared-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@components/ui/skeleton";
import Avatar from "@/widgets/avatar/avatar.ui";
import { getUserNetworksWithInfo } from "../../../src/shared/utils/networks/socialNetworks.utils";
import { ROUTES } from "@/shared/constants/ROUTES";

export default function ProfileComponent() {
  const session = useSession();
  const [visibleImages, setVisibleImages] = useState(4);
  const [showAllYoutubeVideos, setShowAllYoutubeVideos] = useState(false);

  if (session.loading || !session.user) {
    return <Skeleton className="w-full h-[500px] rounded-xl" />;
  }

  const identity = session.user.identity as RiderIdentity;
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

  const age = birthDate
    ? new Date().getFullYear() -
      birthDate.getFullYear() -
      (new Date().getMonth() < birthDate.getMonth() ||
      (new Date().getMonth() === birthDate.getMonth() &&
        new Date().getDate() < birthDate.getDate())
        ? 1
        : 0)
    : "N/A";
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
            <p className="text-lg font-figtree">
              <span className="text-gray-400">
                {session.user.identity.city}
              </span>{" "}
              {session.user.identity.country}
            </p>
            <p className="text-sm font-figtree">{age} ans</p>
            <p className="text-sm font-figtree">
              {session.user.identifier.phoneNumber || "Non renseigné"}
            </p>
            <p className="text-sm font-figtree">
              {session.user.identifier.email || "Non renseigné"}
            </p>
            {birthDate && (
              <p className="text-sm font-figtree">
                {birthDate.toLocaleDateString("fr-FR")}
              </p>
            )}
          </div>
        </div>
        <div className="flex gap-2">
          <Link href={ROUTES.RIDER.EDIT_PROFILE}>
            <Button variant="outline">Modifier le profil</Button>
          </Link>
        </div>
      </div>

      <Card className="mb-10 bg-[#3F4139] text-white border-none">
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
          {session.user.identity?.languageSpoken.map((lang, i) => (
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
          ))}
        </div>
      </section>
      {/* <section className="mb-12 relative">
        <h2 className="text-2xl font-semibold mb-4">Galerie d'images</h2>

        <div
          className={`grid grid-cols-1 md:grid-cols-3 gap-6 relative transition-all duration-700 ${
            !showAllGalleryImages ? "max-h-[50vh] overflow-hidden" : ""
          }`}
        >
          {[1, 2, 3, 4, 5, 6].map((i) => (
            <div
              key={i}
              className="relative w-full aspect-[3/4] overflow-hidden rounded-2xl shadow-lg"
            >
              <Image
                src={`/assets/img/blog-${i}.jpg`}
                alt={`Galerie ${i}`}
                fill
                className="object-cover"
              />
            </div>
          ))}

          {!showAllGalleryImages && (
            <div className="absolute bottom-0 left-0 w-full h-40 bg-gradient-to-t from-white to-transparent pointer-events-none z-10" />
          )}
        </div>

        <div className="mt-6 text-center z-20 relative">
          <Button onClick={() => setShowAllGalleryImages((prev) => !prev)}>
            {showAllGalleryImages ? "Voir moins" : "Voir plus"}
          </Button>
        </div>
      </section> */}
      <section className="mb-12 relative">
        <h2 className="text-2xl font-semibold mb-4">Vidéos YouTube</h2>

        <div
          className={`grid grid-cols-1 md:grid-cols-2 gap-6 relative transition-all duration-700 ${
            !showAllYoutubeVideos ? "max-h-[50vh] overflow-hidden" : ""
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

        <div className="mt-6 text-center z-20 relative">
          {session.user.videos.length > 4 && (
            <Button onClick={() => setShowAllYoutubeVideos((prev) => !prev)}>
              {showAllYoutubeVideos ? "Voir moins" : "Voir plus"}
            </Button>
          )}
        </div>
      </section>
    </div>
  );
}

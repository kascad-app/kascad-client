"use client";

import { useSession } from "@/shared/context/SessionContext";
import { useState } from "react";
import { RiderIdentity, TricksVideo, Image as RiderImage, SocialNetwork } from "@kascad-app/shared-types";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import Image from "next/image";
import Link from "next/link";
import { Skeleton } from "@components/ui/skeleton";

export default function ProfileComponent() {
  const session = useSession();
  const [visibleVideos, setVisibleVideos] = useState(4);
  const [visibleImages, setVisibleImages] = useState(4);

  if (session.loading || !session.user) {
    return <Skeleton className="w-full h-[500px] rounded-xl" />;
  }

  const identity = session.user.identity as RiderIdentity;
  const fullName = identity.fullName || `${identity.firstName} ${identity.lastName}`;
  const birthYear = identity.birthDate ? new Date(identity.birthDate).getFullYear() : null;
  const age = birthYear ? new Date().getFullYear() - birthYear : "N/A";
  const location = identity.city ? `${identity.city}, ${identity.country}` : identity.country || "Localisation inconnue";
  const bio = session.user.description || "Ce rider n'a pas encore renseigné sa biographie.";

  const images: RiderImage[] = session.user.images || [];
  const videos: TricksVideo[] = session.user.performanceSummary?.performanceVideos || [];

  const networks: SocialNetwork[] = session.user.preferences?.networks || [];
  const hasNetwork = (type: SocialNetwork) => networks.includes(type);

  return (
    <div className="max-w-5xl mx-auto px-4 py-10">
      <div className="flex justify-between items-start flex-wrap gap-6 mb-12">
        <div className="flex flex-col gap-2">
          <h1 className="text-3xl font-bold tracking-tight">{fullName}</h1>
          <p className="text-muted-foreground">{location}</p>
          <p className="text-sm">Âge : {age}</p>
        </div>
        <div className="flex gap-2">
          <Link href="/profil/edit">
            <Button variant="outline">Modifier le profil</Button>
          </Link>
          <Button variant="destructive">Déconnexion</Button>
        </div>
      </div>

      <Card className="mb-10">
        <CardHeader>
          <CardTitle>Biographie</CardTitle>
        </CardHeader>
        <CardContent>
          <p className="text-sm whitespace-pre-line">{bio}</p>
        </CardContent>
      </Card>

      {videos.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Vidéos</h2>
          <div className="grid sm:grid-cols-2 gap-4">
            {videos.slice(0, visibleVideos).map((video, i) => (
              <div key={i} className="rounded-lg overflow-hidden aspect-video">
                <iframe
                  src={video.url}
                  title={video.title}
                  className="w-full h-full"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                />
              </div>
            ))}
          </div>
          <div className="mt-6 text-center">
            {visibleVideos < videos.length ? (
              <Button onClick={() => setVisibleVideos((v) => v + 4)}>
                Voir plus de vidéos
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setVisibleVideos(4)}>
                Réinitialiser
              </Button>
            )}
          </div>
        </section>
      )}

      {images.length > 0 && (
        <section className="mb-16">
          <h2 className="text-2xl font-semibold mb-4">Images</h2>
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
            {visibleImages < images.length ? (
              <Button onClick={() => setVisibleImages((v) => v + 4)}>
                Voir plus d'images
              </Button>
            ) : (
              <Button variant="outline" onClick={() => setVisibleImages(4)}>
                Réinitialiser
              </Button>
            )}
          </div>
        </section>
      )}

      <section>
        <h2 className="text-2xl font-semibold mb-4">Réseaux sociaux</h2>
        <div className="flex gap-6 items-center">
          {hasNetwork(SocialNetwork.INSTAGRAM) && (
            <img src="/views/logos/instagram-line.svg" alt="Instagram" className="w-8 h-8" />
          )}
          {hasNetwork(SocialNetwork.YOUTUBE) && (
            <img src="/views/logos/youtube-fill.svg" alt="YouTube" className="w-8 h-8" />
          )}
          {hasNetwork(SocialNetwork.TWITTER) && (
            <img src="/views/logos/twitter-x-line.svg" alt="Twitter" className="w-8 h-8" />
          )}
        </div>
      </section>

    </div>
  );
}

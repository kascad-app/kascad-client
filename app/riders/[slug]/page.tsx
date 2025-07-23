"use client";
import { useGetRider } from "@/entities/riders/riders.hooks";
import {
  getWeatherIcon,
  getWeatherLabel,
} from "@/shared/utils/weather/weather.utils";
import { Language, SocialNetwork } from "@kascad-app/shared-types";
import { Trophy } from "lucide-react";
import Image from "next/image";
import { useParams } from "next/navigation";
import { useState } from "react";
import MasonryGallery from "../../components/MasonryGallery";
import RiderKPISection from "../../components/RiderKPISection";
import RiderTrainingKPI from "../../components/RiderKPITrainingCard";
import RiderSponsorsSection from "../../components/RiderSponsorsSection";
import ScrollSpyNav from "../../components/ScrollSpyNav";


export default function RiderPage() {
  const { slug } = useParams();
  const { data: rider, isLoading, error } = useGetRider(slug as string);
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );

  if (isLoading)
    return <p className="p-8 text-[#101B08]">Chargement du profil...</p>;
  if (error || !rider)
    return <p className="p-8 text-red-500">Rider introuvable.</p>;

  const closeLightbox = () => setSelectedImageIndex(null);
  const showPrevImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) =>
      prev! > 0 ? prev! - 1 : images.length - 1,
    );
  };
  const showNextImage = () => {
    if (selectedImageIndex === null) return;
    setSelectedImageIndex((prev) => (prev! + 1) % images.length);
  };

  const fullName =
    rider.identity?.fullName ||
    `${rider.identity?.firstName || ""} ${rider.identity?.lastName || ""
      }`.trim() ||
    "Nom non renseigné";
  const sports =
    rider.preferences?.sports?.map((s) => s.name).filter(Boolean) || [];
  const birthDate = rider.identity?.birthDate
    ? new Date(rider.identity.birthDate)
    : null;
  const today = new Date();
  const age = birthDate
    ? today.getFullYear() -
    birthDate.getFullYear() -
    (today.getMonth() < birthDate.getMonth() ||
      (today.getMonth() === birthDate.getMonth() &&
        today.getDate() < birthDate.getDate())
      ? 1
      : 0)
    : null;
  const location =
    rider.identity?.city || rider.identity?.country
      ? `${rider.identity?.city || ""}${rider.identity?.city && rider.identity?.country ? ", " : ""
      }${rider.identity?.country || ""}`
      : "Localisation inconnue";
  const profilePicture =
    rider.avatarUrl && rider.avatarUrl.includes("http")
      ? rider.avatarUrl
      : "/assets/img/blog4.jpg"; const images = rider.images?.map((img) => img.url).filter(Boolean) || [];
  const stats = rider.performanceSummary?.performances || [];
  const podiums = rider.performanceSummary?.totalPodiums ?? 0;
  const networks: SocialNetwork[] =
    rider.preferences?.networks
      ?.map((n) => n as SocialNetwork)
      .filter(Boolean) || [];
  const hasNetwork = (type: SocialNetwork) => networks.includes(type);
  const rawLanguages = rider.identity?.languageSpoken?.filter(Boolean) || [];
  const youtube = rider.videos?.filter((v) => !!v.url) || [];
  const availability = rider.availibility?.isAvailable;
  const sessionsPerWeek = rider.trainingFrequency?.sessionsPerWeek ?? 0;
  const hoursPerSession = rider.trainingFrequency?.hoursPerSession ?? 0;

  const formatDate = (date?: Date | string) => {
    if (!date) return "Date inconnue";
    const dateObj = typeof date === "string" ? new Date(date) : date;
    if (!(dateObj instanceof Date) || isNaN(dateObj.getTime())) {
      return "Date inconnue";
    }
    return dateObj.toLocaleDateString("fr-FR");
  };



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

  return (
    <div className="bg-[#F4F3EF] text-[#000000] min-h-screen py-16">
      <div className="relative text-center mb-16 h-[50dvh] flex items-center justify-center">
        {/* BLOB EN FOND */}
        <div className="absolute inset-0 flex items-center justify-center z-5">
          <div className="w-72 h-72 md:w-96 md:h-96 bg-[#D2FA52] rounded-full blur-3xl opacity-30 animate-pulse" />
        </div>

        {/* TEXTE */}
        <div className="relative z-10">
          <h1 className="text-4xl md:text-5xl font-michroma font-bold mb-2">
            {fullName}
          </h1>
          <p className="uppercase py-8 text-[1.6rem] max-w-[60dvw] font-michroma tracking-widest text-[#B1BD93]">
            {sports.join(", ")}
          </p>
        </div>
      </div>

      <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto items-start">
        <div className="w-full md:w-1/2 ">
          <Image
            src={profilePicture}
            alt={fullName}
            width={600}
            height={800}
            className="rounded-xl object-cover w-full border-4 border-[#D2FA52]"
          />
        </div>

        <div className="w-full md:w-1/2 flex flex-col gap-4" id="profile">
          <p className="whitespace-pre-line text-lm leading-relaxed">
            {rider.identity.bio || "Pas de bio disponible."}
          </p>

          <div className="flex flex-col gap-6 ">
            <div>
              <div className="text-3xl font-bold">{age}</div>
              <div className="text-sm ">ans</div>
            </div>
            <p className="uppercase text-sm mb-2 font-michroma">Localistation</p>

            <div className="text-sm ">{location}</div>
          </div>

          {/* <div className="flex flex-wrap gap-2 mt-4">
            {sports.map((s, i) => (
              <span className="relative inline-block group">
                <span
                  className="block px-6 py-2 text-xs uppercase font-bold tracking-wider text-[#D2FA52] bg-[#101B08] transition-transform group-hover:scale-105"
                  style={{
                    clipPath: 'polygon(0% 10%, 90% 0%, 100% 90%, 10% 100%)',
                  }}
                >
                  {s}
                </span>
                <span className="absolute left-0 -bottom-[2px] w-full h-[2px] bg-[#101B08]"></span>
              </span>
            ))}
          </div> */}

          {/* RÉSEAUX */}
          <div className="mt-6">
            <p className="uppercase text-sm mb-2 font-michroma">Réseaux</p>
            <div className="flex flex-wrap gap-3">
              {Object.values(SocialNetwork).map(
                (network) =>
                  hasNetwork(network as SocialNetwork) && (
                    <span className="relative inline-block group">
                      <span
                        className="block px-6 py-2 text-xs uppercase font-bold tracking-wider text-[#101B08] bg-[#B1BD93] transition-transform group-hover:scale-105"
                        style={{
                          clipPath: 'polygon(10% 0%, 100% 10%, 90% 100%, 0% 90%)',
                        }}
                      >
                        {network}
                      </span>
                      <span className="absolute left-0 -bottom-[2px] w-full h-[2px] bg-[#101B08]"></span>
                    </span>


                  )
              )}
            </div>
          </div>

          <div className="mt-4">
            <p className="uppercase text-sm mb-2 font-michroma">Disponibilité</p>

            {availability === true ? (
              <p className="text-sm text-[#101B08] border-2 rounded-4xl px-3 py-1 w-fit">
                disponible
              </p>
            ) : availability === false ? (
              <p className="text-sm text-gray-500 border-2 rounded-4xl px-3 py-1 w-fit">
                non disponible
              </p>
            ) : (
              <p className="text-sm text-gray-400 italic">
                Disponibilité inconnue
              </p>
            )}
          </div>

          <div className="mt-4">
            <p className="uppercase text-sm mb-2 font-michroma">Langues</p>
            <div className="flex flex-wrap gap-2">
              {rawLanguages.map((lang, i) => (
                <span
                  key={i}
                  className="px-3 py-1 rounded-full text-sm bg-[#1a1a19] text-[#D2FA52] uppercase"
                >
                  {typeof lang === "string" ? lang : Language[lang]}
                </span>
              ))}
            </div>
          </div>
        </div>
      </div>



      {images.length > 1 && (
        <div className="mt-20 max-w-6xl mx-auto px-4" id="gallery">
          <h3 className="text-4xl font-bold mb-6 text-[#101B08] font-michroma tracking-widest">
            Galerie
          </h3>
          <MasonryGallery
            images={images}
            onImageClick={(index) => setSelectedImageIndex(index)}
          />
        </div>
      )}

      {youtube.length > 0 && (
        <div className="mt-20 max-w-6xl mx-auto px-4" id="videos">
          <h3 className="text-4xl font-bold mb-6 text-[#101B08] font-michroma tracking-widest">
            Vidéos
          </h3>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {youtube.map(({ url, title }, index) => {
              const videoId = url.includes("youtube.com")
                ? new URL(url).searchParams.get("v")
                : url.includes("youtu.be")
                  ? url.split("/").pop()
                  : null;

              return videoId ? (
                <div
                  key={index}
                  className="relative group w-full aspect-video rounded-xl overflow-hidden border-2 border-[#D2FA52] shadow-lg hover:shadow-2xl transition-all duration-300"
                >
                  <iframe
                    className="absolute top-0 left-0 w-full h-full"
                    src={`https://www.youtube.com/embed/${videoId}`}
                    title={title || `YouTube video ${index + 1}`}
                    frameBorder="0"
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                </div>
              ) : (
                <p key={index} className="text-sm text-red-500">
                  Lien vidéo invalide : {url}
                </p>
              );
            })}
          </div>
        </div>
      )}

      {selectedImageIndex !== null && (
        <div
          className="fixed inset-0 bg-black bg-opacity-90 z-[1000] flex items-center justify-center"
          onClick={closeLightbox}
        >
          <button
            onClick={(e) => {
              e.stopPropagation();
              showPrevImage();
            }}
            className="absolute left-8 text-white text-4xl"
          >
            ‹
          </button>

          <img
            src={images[selectedImageIndex]}
            alt={`Image ${selectedImageIndex + 1}`}
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          />

          <button
            onClick={(e) => {
              e.stopPropagation();
              showNextImage();
            }}
            className="absolute right-8 text-white text-4xl"
          >
            ›
          </button>

          <button
            onClick={(e) => {
              e.stopPropagation();
              closeLightbox();
            }}
            className="absolute top-8 right-8 text-white text-3xl"
          >
            ✕
          </button>
        </div>
      )}

      <div id="sponsors">
        <RiderSponsorsSection

          currentSponsors={rider.sponsorSummary?.currentSponsors || []}
          desiredSponsors={rider.sponsorSummary?.wishListSponsors || []}
        />
      </div>

      {/* Performances */}
      <div className="mt-20 max-w-6xl mx-auto px-4" id="performances">
        <h3 className="text-4xl font-bold mb-6 text-[#101B08] font-michroma tracking-widest">
          PERFORMANCES
        </h3>

        <div className="mb-10 flex items-center gap-4 text-[#B1BD93] text-sm">
          <Trophy className="w-5 h-5" />
          <p className="uppercase tracking-wide">
            Total podiums :{" "}
            <span className="text-[#101B08] font-bold">{podiums}</span>
          </p>
        </div>

        {stats.length < 0 ? (
          <div className="text-center py-12 bg-[#1a1a19] text-white rounded-xl">
            <Trophy className="w-12 h-12 text-gray-500 mx-auto mb-4" />
            <p className="text-lg">Aucune performance enregistrée</p>
            <p className="text-sm text-gray-400">
              Ce rider n'a pas encore partagé ses résultats.
            </p>
          </div>
        ) : (
          <div className="relative border-l-4 border-[#D2FA52] pl-6 space-y-12">
            {stats.map((performance, index) => (
              <div key={index} className="relative group">
                <div className="absolute -left-[2.25rem] top-1 w-5 h-5 bg-[#101B08] rounded-full group-hover:scale-125 transition-transform" />

                <div className="bg-[#101B08] text-white p-6 rounded-lg shadow-md group-hover:shadow-lg transition-all">
                  <div className="flex items-center justify-between mb-2">
                    <h4 className="text-xl font-bold flex items-center gap-2">
                      {getRankingBadge(performance?.ranking)}
                      {performance?.eventName || "Événement inconnu"}
                    </h4>
                    <span className="text-xs opacity-60 font-mono">
                      {formatDate(performance?.startDate)}
                    </span>
                  </div>
                  <p className="text-[#B1BD93] text-sm mb-1">
                    {performance?.category || "Catégorie inconnue"} —{" "}
                    {performance?.sport?.name || "Sport inconnu"}
                  </p>
                  <p className="text-sm text-gray-300">
                    {`${performance?.location?.city || "Ville inconnue"}, ${performance?.location?.country || "Pays inconnu"}`}
                  </p>

                  {performance?.weather && (
                    <p className="text-xs text-gray-400 mt-2">
                      {getWeatherIcon(performance.weather)}{" "}
                      {getWeatherLabel(performance.weather)}
                    </p>
                  )}

                  {performance?.notes && (
                    <div className="mt-3 text-sm text-gray-300">
                      <p className="font-semibold text-[#D2FA52] mb-1">Notes :</p>
                      <p>{performance.notes}</p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>



      {/* Training */}
      <div id="entrainement">
        <RiderTrainingKPI
          sessionsPerWeek={sessionsPerWeek}
          hoursPerSession={hoursPerSession}
        />
      </div>

      <div id="kpi">
        <RiderKPISection stats={stats} />
      </div>

      <ScrollSpyNav />

      <div className="fixed bottom-0 w-full h-[5dvh] bg-gradient-to-b from-transparent to-[#d3fa5265]"></div>
    </div>
  );
}

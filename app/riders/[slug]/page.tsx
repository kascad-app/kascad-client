"use client";
import { useGetRider } from "@/entities/riders/riders.hooks";
import {
  getWeatherIcon,
  getWeatherLabel,
} from "@/shared/utils/weather/weather.utils";
import { Language, SocialNetwork } from "@kascad-app/shared-types";
import { Trophy } from "lucide-react";
import Image from "next/image";
import { Skeleton } from "@/components/ui/skeleton";
import { useParams } from "next/navigation";
import { useState, useRef, useEffect } from "react";
import MasonryGallery from "../../components/MasonryGallery";
import RiderKPISection from "../../components/RiderKPISection";
import RiderTrainingKPI from "../../components/RiderKPITrainingCard";
import RiderSponsorsSection from "../../components/RiderSponsorsSection";
import ScrollSpyNav, { Section } from "../../components/ScrollSpyNav";
import ShapeCanvas from "../../components/ShapeCanvas";
import { networkData } from "@/shared/utils/networks/socialNetworks.utils";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export default function RiderPage() {
  const { slug } = useParams();
  const { data: rider, isLoading, error } = useGetRider(slug as string);
  if (!rider && !isLoading && !error) return null;
  const [selectedImageIndex, setSelectedImageIndex] = useState<number | null>(
    null,
  );
  const [imgLoaded, setImgLoaded] = useState(false);

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
    rider?.identity?.fullName ||
    `${rider?.identity?.firstName || ""} ${
      rider?.identity?.lastName || ""
    }`.trim() ||
    "Nom non renseigné";
  const sports =
    rider?.preferences?.sports?.map((s) => s.name).filter(Boolean) || [];
  const birthDate = rider?.identity?.birthDate
    ? new Date(rider?.identity.birthDate)
    : null;
  const age: number = birthDate
    ? new Date().getFullYear() -
      birthDate.getFullYear() -
      (new Date().getMonth() < birthDate.getMonth() ||
      (new Date().getMonth() === birthDate.getMonth() &&
        new Date().getDate() < birthDate.getDate())
        ? 1
        : 0)
    : 0;
  const location =
    rider?.identity?.city || rider?.identity?.country
      ? `${rider?.identity?.city || ""}${
          rider?.identity?.city && rider?.identity?.country ? ", " : ""
        }${rider?.identity?.country || ""}`
      : "";
  const profilePicture =
    rider?.avatarUrl && rider?.avatarUrl.includes("http")
      ? rider?.avatarUrl
      : "/assets/img/avatar/default-avatar.jpg";
  const images = rider?.images?.map((img) => img.url).filter(Boolean) || [];
  const stats = rider?.performanceSummary?.performances || [];
  const podiums = rider?.performanceSummary?.totalPodiums ?? 0;
  const networks: SocialNetwork[] =
    rider?.preferences?.networks
      ?.map((n) => n as SocialNetwork)
      .filter(Boolean) || [];
  const hasNetwork = (type: SocialNetwork) => networks.includes(type);
  const rawLanguages = rider?.identity?.languageSpoken?.filter(Boolean) || [];
  const youtube = rider?.videos?.filter((v) => !!v.url) || [];
  const availability = rider?.availibility?.isAvailable;
  const sessionsPerWeek = rider?.trainingFrequency?.sessionsPerWeek ?? 0;
  const hoursPerSession = rider?.trainingFrequency?.hoursPerSession ?? 0;

  // GSAP refs et effets (après images/youtube)
  const profileImgRef = useRef<HTMLImageElement | null>(null);
  const modalImgRef = useRef<HTMLImageElement | null>(null);
  const videoRefs = useRef<(HTMLDivElement | null)[]>([]);

  useEffect(() => {
    if (profileImgRef.current) {
      gsap.fromTo(
        profileImgRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: profileImgRef.current,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    }
    videoRefs.current.forEach((el) => {
      if (!el) return;
      gsap.fromTo(
        el,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.8,
          ease: "power3.out",
          scrollTrigger: {
            trigger: el,
            start: "top 90%",
            toggleActions: "play none none none",
          },
        },
      );
    });
    return () => {
      ScrollTrigger.getAll().forEach((st) => st.kill());
    };
  }, [images, youtube]);

  useEffect(() => {
    if (selectedImageIndex !== null && modalImgRef.current) {
      gsap.fromTo(
        modalImgRef.current,
        { opacity: 0, y: 40 },
        {
          opacity: 1,
          y: 0,
          duration: 0.5,
          ease: "power3.out",
        },
      );
    }
  }, [selectedImageIndex]);

  // Overlay loader sur toute la page
  if (isLoading)
    return (
      <div className="fixed inset-0 z-[9999] flex flex-col items-center justify-center bg-white bg-opacity-90 min-h-screen min-w-full">
        <div className="animate-spin rounded-full h-20 w-20 border-t-4 border-b-4 border-[#d2fa52] mb-8"></div>
        <span className="text-2xl text-[#101B08] font-bold font-figtree">
          Chargement du portfolio...
        </span>
      </div>
    );
  if (error || !rider)
    return <p className="p-8 text-red-500">Une erreur est survenue.</p>;

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

  // Détermination dynamique des sections à afficher dans le scrollspy
  const scrollSections: Section[] = [
    { id: "profile", label: "Profil" },
    ...(images.length > 1 ? [{ id: "gallery", label: "Galerie" }] : []),
    ...(youtube.length > 0 ? [{ id: "videos", label: "Vidéos" }] : []),
    ...(rider?.sponsorSummary?.currentSponsors?.length > 0
      ? [{ id: "sponsors", label: "Sponsors" }]
      : []),
    ...(stats.length > 0 || sessionsPerWeek > 0
      ? [{ id: "performances", label: "Performances" }]
      : []),
  ];

  return (
    <div className="bg-[#F4F3EF] text-[#000000] min-h-screen pb-10">
      <div className="relative text-center mb-16 h-[50dvh] flex items-center justify-center py-16">
        {/* BLOB EN FOND */}
        <ShapeCanvas className="z-[0] absolute inset-0" />
        {/* <div className="absolute inset-0 flex items-center justify-center z-5">
          <div className="w-72 h-72 md:w-96 md:h-96 bg-primary-green rounded-full blur-3xl opacity-30 animate-pulse" />
        </div> */}

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

      <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto items-start relative z-10">
        <div className="w-full md:w-1/2 ">
          <div className="relative w-full min-h-[400px]">
            {!imgLoaded && (
              <Skeleton className="absolute inset-0 w-full h-full rounded-xl border-4 border-primary-green bg-gray-200" />
            )}
            <Image
              src={profilePicture}
              alt={fullName}
              width={600}
              height={800}
              className={`rounded-xl object-cover w-full border-4 border-primary-green transition-opacity duration-300 opacity-0 translate-y-10 ${
                imgLoaded ? "" : ""
              }`}
              ref={profileImgRef}
              onLoad={() => setImgLoaded(true)}
              onError={() => setImgLoaded(true)}
              priority
            />
          </div>
        </div>

        <div
          className="w-full mx-5 md:mx-0 md:w-1/2 flex flex-col gap-4"
          id="profile"
        >
          <p className="whitespace-pre-line text-lm leading-relaxed">
            {rider?.identity.bio || (
              <span className="italic text-gray-400">
                Aucune bio disponible.
              </span>
            )}
          </p>

          <div className="flex flex-col gap-6 ">
            <div>
              {birthDate && age > 0 ? (
                <>
                  <span className="text-3xl font-bold">{age}</span>
                  <div className="text-sm ">ans</div>
                </>
              ) : (
                <span className="font-regular italic text-lm text-gray-400">
                  Date de naissance non renseignée
                </span>
              )}
            </div>
            <div>
              <p className="uppercase text-sm mb-2 font-michroma">
                Localistation
              </p>

              <div>
                {location || (
                  <span className="italic text-lm text-gray-400">
                    Aucune localisation disponible.
                  </span>
                )}
              </div>
            </div>
          </div>

          {sports.length > 0 && (
            <div className="mt-6">
              <p className="uppercase text-sm mb-2 font-michroma">Sport</p>
              <div className="flex flex-wrap gap-2 mt-2">
                {sports.map((s, i) => (
                  <span
                    key={i}
                    className="flex items-center gap-2 px-4 py-2 rounded-full shadow-sm bg-primary-green text-xs font-bold uppercase transition-transform hover:scale-105"
                    style={{ minWidth: 0 }}
                  >
                    <span className="truncate">{s}</span>
                  </span>
                ))}
              </div>
            </div>
          )}

          <div className="mt-6">
            <p className="uppercase text-sm mb-2 font-michroma">Réseaux</p>
            <div className="flex flex-row items-center flex-wrap gap-1">
              {networks.length > 0 ? (
                Object.values(SocialNetwork).map(
                  (network) =>
                    hasNetwork(network as SocialNetwork) && (
                      <div
                        key={network}
                        className={`relative group flex items-center h-10 cursor-pointer bg-[#F4F3EF] text-[#101B08] rounded-full w-10 border border-[#101B08] `}
                        tabIndex={0}
                        aria-label={
                          networkData[network as SocialNetwork]?.name || network
                        }
                      >
                        <span
                          className={`absolute left-0 top-0 h-full flex items-center justify-center w-10 h-10`}
                        >
                          {networkData[network as SocialNetwork]?.icon}
                        </span>
                      </div>
                    ),
                )
              ) : (
                <span className="italic text-lm text-gray-400">
                  Aucun réseau renseigné
                </span>
              )}
            </div>
          </div>

          <div className="mt-4">
            <p className="uppercase text-sm mb-2 font-michroma">
              Disponibilité
            </p>

            {availability === true ? (
              <p className="text-sm text-[#101B08] border-2 rounded-4xl px-4 py-2 w-fit">
                disponible
              </p>
            ) : availability === false ? (
              <p className="text-sm text-gray-500 border-2 rounded-4xl px-4 py-2 w-fit">
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
              {rawLanguages.length > 0 ? (
                rawLanguages.map((lang, i) => (
                  <span
                    key={i}
                    className="px-6 py-2 rounded-full text-sm bg-[#1a1a19] text-primary-green uppercase"
                  >
                    {typeof lang === "string" ? lang : Language[lang]}
                  </span>
                ))
              ) : (
                <span className="italic text-lm text-gray-400">
                  Aucune langue renseignée
                </span>
              )}
            </div>
          </div>
        </div>
      </div>

      {images.length > 0 && (
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
                  className="relative group w-full aspect-video rounded-xl overflow-hidden border-2 border-primary-green shadow-lg hover:shadow-2xl transition-all duration-300 opacity-0 translate-y-10"
                  ref={(el) => {
                    videoRefs.current[index] = el;
                  }}
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
            className="max-w-[90vw] max-h-[90vh] object-contain rounded-lg shadow-2xl opacity-0 translate-y-10"
            ref={modalImgRef}
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
          currentSponsors={rider?.sponsorSummary?.currentSponsors || []}
          desiredSponsors={rider?.sponsorSummary?.wishListSponsors || []}
        />
      </div>

      {/* Performances */}
      {stats.length > 0 && (
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
            <div className="relative border-l-4 border-primary-green pl-6 space-y-12">
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
                      {`${performance?.location?.city || "Ville inconnue"}, ${
                        performance?.location?.country || "Pays inconnu"
                      }`}
                    </p>

                    {performance?.weather && (
                      <p className="text-xs text-gray-400 mt-2">
                        {getWeatherIcon(performance.weather)}{" "}
                        {getWeatherLabel(performance.weather)}
                      </p>
                    )}

                    {performance?.notes && (
                      <div className="mt-3 text-sm text-gray-300">
                        <p className="font-semibold text-primary-green">
                          Notes :
                        </p>
                        <p>{performance.notes}</p>
                      </div>
                    )}
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      )}

      {/* Training */}
      {sessionsPerWeek > 0 && (
        <div id="entrainement">
          <RiderTrainingKPI
            sessionsPerWeek={sessionsPerWeek}
            hoursPerSession={hoursPerSession}
          />
        </div>
      )}

      {stats.length > 0 && (
        <div id="kpi">
          <RiderKPISection stats={stats} />
        </div>
      )}

      <div className="hidden md:flex">
        <ScrollSpyNav sections={scrollSections} />
      </div>

      {/* <div className="fixed bottom-0 w-full h-[5dvh] bg-gradient-to-b from-transparent to-[#d3fa5265]"></div> */}
    </div>
  );
}

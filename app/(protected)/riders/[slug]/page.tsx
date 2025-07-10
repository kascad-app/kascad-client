"use client";

import { useGetRider } from "@/entities/riders/riders.hooks";
import Image from "next/image";
import { useParams } from "next/navigation";
import { SocialNetwork, Language } from "@kascad-app/shared-types";
import Masonry from "react-masonry-css";
import MasonryGallery from "../../../components/MasonryGallery";

export default function RiderPage() {
    const { slug } = useParams();
    const { data: rider, isLoading, error } = useGetRider(slug as string);

    if (isLoading) return <p className="p-8 text-[#101B08]">Chargement du profil...</p>;
    if (error || !rider) return <p className="p-8 text-red-500">Rider introuvable.</p>;

    const fullName = rider.identity.fullName || `${rider.identity.firstName} ${rider.identity.lastName}`;
    const sports = rider.preferences?.sports?.map((s) => s.name) || [];
    const birthDate = new Date(rider.identity.birthDate);
    const today = new Date();
    const age = today.getFullYear() - birthDate.getFullYear() -
        (today.getMonth() < birthDate.getMonth() ||
            (today.getMonth() === birthDate.getMonth() && today.getDate() < birthDate.getDate()) ? 1 : 0);
    const location = `${rider.identity.city}, ${rider.identity.country}`;
    const images = rider.images?.map((img) => img.url) || [];
    const rawLanguages = rider.identity.languageSpoken || [];
    const languages: Language[] = rawLanguages.map((lang) => typeof lang === "string" ? Language[lang as keyof typeof Language] : lang);
    const networks: SocialNetwork[] = rider.preferences?.networks?.map(n => n as SocialNetwork) || [];
    const hasNetwork = (type: SocialNetwork) => networks.includes(type);

    return (
        <div className="bg-[#F4F3EF] text-[#101B08] min-h-screen py-16 px-4">
            <div className="relative text-center mb-16 h-[50dvh] flex items-center justify-center">
                {/* BLOB EN FOND */}
                <div className="absolute inset-0 flex items-center justify-center z-5">
                    <div className="w-72 h-72 md:w-96 md:h-96 bg-[#D2FA52] rounded-full blur-3xl opacity-30 animate-pulse" />
                </div>

                {/* TEXTE */}
                <div className="relative z-10">
                    <h1 className="text-4xl md:text-5xl font-michroma font-bold mb-2">{fullName}</h1>
                    <p className="uppercase text-sm tracking-widest text-[#B1BD93]">{sports.join(", ")}</p>
                </div>
            </div>

            <div className="flex flex-col md:flex-row gap-10 max-w-6xl mx-auto items-start">
                <div className="w-full md:w-1/2 ">
                    {images[0] ? (
                        <Image
                            src={images[0]}
                            alt={fullName}
                            width={600}
                            height={800}
                            className="rounded-xl object-cover w-full border-4 border-[#D2FA52]"
                        />
                    ) : (
                        <div className="w-full aspect-[3/4] bg-[#D2FA52] rounded-xl"></div>
                    )}
                </div>

                <div className="w-full md:w-1/2 flex flex-col gap-4">
                    <p className="whitespace-pre-line text-sm leading-relaxed">
                        {rider.identity.bio || "Pas de bio disponible."}
                    </p>

                    <div className="flex flex-col gap-6 ">
                        <div>
                            <div className="text-3xl font-bold">{age}</div>
                            <div className="text-sm">ans</div>
                        </div>
                        <div className="text-sm ">
                            {location}
                        </div>
                    </div>

                    <div className="flex flex-wrap gap-2 mt-4">
                        {sports.map((s, i) => (
                            <span
                                key={i}
                                className="px-4 py-1 text-xs uppercase tracking-wide rounded-full bg-[#3F4139] text-[#F4F3EF] font-semibold"
                            >
                                {s}
                            </span>
                        ))}
                    </div>

                    <div className="mt-6">
                        <p className="uppercase text-sm mb-2">Réseaux</p>
                        <div className="flex flex-wrap gap-2">
                            {Object.values(SocialNetwork).map((network) => (
                                hasNetwork(network as SocialNetwork) && (
                                    <span key={network} className="px-3 py-1 rounded-full text-sm bg-[#B1BD93] text-[#101B08] uppercase">
                                        {network}
                                    </span>
                                )
                            ))}
                        </div>
                    </div>

                    <div className="mt-4">
                        <p className="uppercase text-sm mb-2">Langues</p>
                        <div className="flex flex-wrap gap-2">
                            {languages.map((lang, i) => (
                                <span key={i} className="px-3 py-1 rounded-full text-sm bg-[#3F4139] text-[#F4F3EF] uppercase">
                                    {lang === Language.FR ? "Français" : "Anglais"}
                                </span>
                            ))}
                        </div>
                    </div>
                </div>
            </div>

            <div className="mt-20 max-w-6xl mx-auto px-4">
                <h3 className="text-2xl font-bold mb-8 border-b border-[#B1BD93] pb-2 uppercase">Galerie</h3>
                {images.length > 1 ? (
                    <MasonryGallery images={images} />
                ) : (
                    <div className="w-[300px] h-[400px] bg-[#D2FA52] rounded-xl"></div>
                )}
            </div>
        </div>
    );
}

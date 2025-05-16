"use client";

import { getAthletes, type AthleteProfile } from "@/shared/model/sportifs";
import Image from "next/image";
import Link from "next/link";
import { useParams } from "next/navigation";
import { useEffect, useState } from "react";
import ShapeCanvas from "../../profile/ShapeCanvas";

export default function AthleteProfile() {
    const params = useParams();
    const [Profile, setProfile] = useState<AthleteProfile | null>(null);
    const [visibleVideos, setVisibleVideos] = useState(4);
    const [visibleImages, setVisibleImages] = useState(4);

    useEffect(() => {
        async function fetchData() {
            const athletes = await getAthletes();
            const athlete = athletes.find((a) => a.slug === params.slug);
            if (athlete) setProfile(athlete);
        }
        if (params?.slug) fetchData();
    }, [params]);

    if (!Profile) return null;

    const handleShowMoreVideos = () => setVisibleVideos((prev) => Math.min(prev + 4, Profile.videos.length));
    const handleResetVideos = () => setVisibleVideos(4);
    const handleShowMoreImages = () => setVisibleImages((prev) => Math.min(prev + 4, Profile.images.length));
    const handleResetImages = () => setVisibleImages(4);

    return (
        <div className="overflow-x-hidden">
            <div className="relative flex justify-center items-center flex-col w-full h-[100dvh]">
                <ShapeCanvas className="absolute z-[-1] pointer-events-none filter blur-[20px]" />
                <p className="text-2xl leading-[30px] font-michroma">{Profile.sport}</p>
                <h1>{Profile.name}</h1>
            </div>

            <div className="flex mt-8 px-24 items-center w-full py-24 gap-20">
                <div className="profile_infos_image w-[40%]">
                    <Image
                        src={Profile.image}
                        alt={Profile.name}
                        width={900}
                        height={900}
                        className="rounded-[16px] object-cover w-full h-[70dvh]"
                    />
                </div>
                <div className="profile_infos_content font-michroma w-[50dvw] space-y-6">
                    <p>{Profile.bio}</p>


                    <div className="flex gap-2  items-end">
                        <div className="text-2xl text-bold">{Profile.age}</div>
                        <div className="label">ans</div>
                    </div>
                    <div className="flex gap-2 items-end">
                        <div className="text-2xl text-bold">{Profile.favorites}</div>
                        <div className="label">favoris</div>
                    </div>
                    <div className="profile_infos_loc">
                        <span>{Profile.location}</span>
                    </div>

                    <div className="profile_infos_socials">
                        <span className="label">Suivez-moi sur</span>
                        <div className="logos">
                            {Profile.socials?.youtube && (
                                <Link href={Profile.socials.youtube}>
                                    <img src="/views/logos/facebook-circle-fill.svg" alt="YouTube" className="h-10 w-10" />
                                </Link>
                            )}
                            {Profile.socials?.twitter && (
                                <Link href={Profile.socials.twitter}>
                                    <img src="/views/logos/twitter-x-line.svg" alt="Twitter" className="h-10 w-10" />
                                </Link>
                            )}
                            {Profile.socials?.instagram && (
                                <Link href={Profile.socials.instagram}>
                                    <img src="/views/logos/instagram-line.svg" alt="Instagram" className="h-10 w-10" />
                                </Link>
                            )}
                        </div>
                    </div>
                </div>
            </div>

            <div className="profile_medias relative bg-black py-24">
                <div className="mt-8 px-24">
                    <h3 className="mb-10 text-4xl font-[Michroma] text-white uppercase">Vidéos</h3>
                    <div className="flex flex-wrap gap-6 w-7xl">
                        {Profile.videos.slice(0, visibleVideos).map((video, index) => (
                            <iframe
                                key={index}
                                className="w-[30%] rounded-[16px] aspect-[1.78]"
                                src={video}
                                title={`YouTube video ${index + 1}`}
                                frameBorder="0"
                                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                                allowFullScreen
                            ></iframe>
                        ))}
                    </div>
                    <div>
                        {visibleVideos < Profile.videos.length ? (
                            <button className="block mx-auto mt-12 px-4 py-2 bg-[#454545] text-white rounded-lg" onClick={handleShowMoreVideos}>Voir plus de vidéos</button>
                        ) : (
                            <button className="block mx-auto mt-12 px-4 py-2 bg-[#454545] text-white rounded-lg" onClick={handleResetVideos}>Réinitialiser</button>
                        )}
                    </div>
                </div>

                <div className="mt-8 px-24">
                    <h3 className="mb-10 text-4xl font-[Michroma] text-white uppercase">Images</h3>
                    <div className="flex flex-wrap gap-6 w-full">
                        {Profile.images.slice(0, visibleImages).map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                alt={`Image ${index + 1}`}
                                width={300}
                                height={300}
                                className="w-[20%] rounded-[16px] object-cover aspect-[0.94]"
                            />
                        ))}
                    </div>
                    <div>
                        {visibleImages < Profile.images.length ? (
                            <button className="block mx-auto mt-12 px-4 py-2 bg-[#454545] text-white rounded-lg" onClick={handleShowMoreImages}>Voir plus d'images</button>
                        ) : (
                            <button className="block mx-auto mt-12 px-4 py-2 bg-[#454545] text-white rounded-lg" onClick={handleResetImages}>Réinitialiser</button>
                        )}
                    </div>
                </div>

                {Profile.instagram && (
                    <div className="mt-64 bg-black py-18 px-24">
                        <div className="logo_insta"></div>
                        <div className="mb-[18px] text-[32px] font-michroma text-white text-center">{Profile.instagram.username}</div>
                        <div className="mx-auto text-white text-[16px] w-fit">
                            {Profile.instagram.description.map((desc, index) => (
                                <p className="w-fit" key={index}>{desc}</p>
                            ))}
                        </div>
                        <div className="flex mt-[42px] flex-wrap gap-[4px] mx-auto justify-center">
                            {Profile.instagram.posts.map((post, index) => (
                                <Image
                                    key={index}
                                    src={post}
                                    alt={`Post Instagram ${index + 1}`}
                                    width={300}
                                    height={300}
                                    className="aspect-square w-[20%] object-cover"
                                />
                            ))}
                        </div>
                    </div>
                )}
            </div>
        </div>
    );
}
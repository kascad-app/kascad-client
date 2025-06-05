"use client";

import { useGetRider } from "@/entities/riders/riders.hooks";
import Image from "next/image";
import { useParams } from "next/navigation";

export default function RiderPage() {
    const { slug } = useParams();
    const { data: rider, isLoading, error } = useGetRider(slug as string);

    if (isLoading) return <p className="p-8">Chargement du profil...</p>;
    if (error || !rider) return <p className="p-8 text-red-500">Rider introuvable.</p>;

    const fullName =
        rider.identity.fullName ||
        `${rider.identity.firstName} ${rider.identity.lastName}`;
    const sports = rider.preferences?.sports?.map((s) => s.name) || [];
    const age = new Date().getFullYear() - new Date(rider.identity.birthDate).getFullYear();
    const location = `${rider.identity.city}, ${rider.identity.country}`;
    const images = rider.images?.map((img) => img.url) || [];

    return (
        <div className="">
            <div className="flex justify-center items-center flex-col w-screen min-h-[100dvh]">
                <p className="text-2xl leading-[30px] font-michroma">{sports.join(", ")}</p>
                <h1 className="text-4xl font-bold text-center">{fullName}</h1>
            </div>

            <div className="flex mt-24 mx-auto max-w-[1200px] gap-10">
                <div className="profile_infos_image w-1/2">
                    {/* <Image
                        src={images[0] || "/placeholder.jpg"}
                        alt={fullName}
                        width={600}
                        height={800}
                        className="rounded-2xl object-cover w-full h-full"
                        onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.src = "./assets/img/blog-5.jpg";
                        }}
                    /> */}
                    <Image
                        src={"https://images.unsplash.com/photo-1563297592-fc163070b609?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                        alt={fullName}
                        width={600}
                        height={800}
                        className="rounded-2xl object-cover w-full h-full"
                        onError={(e) => {
                            const target = e.currentTarget as HTMLImageElement;
                            target.src = "./assets/img/blog-5.jpg";
                        }}
                    />

                </div>
                <div className="profile_infos_content w-1/2">
                    <p className="mb-4 text-sm text-gray-700 whitespace-pre-line">
                        {rider.identity.practiceLocation || "Pas de bio disponible."}
                    </p>
                    <div className="profile_infos_stats grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="text-2xl font-bold">{age}</div>
                            <div className="text-sm text-gray-500">ans</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-700">{location}</div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {sports.map((s, i) => (
                            <span
                                key={i}
                                className="px-3 py-1 text-xs border rounded-full bg-gray-100"
                            >
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="profile_medias relative">

                <div className="mt-32 px-4">
                    <h3 className="mb-6 text-3xl font-[Michroma] text-white uppercase">Images</h3>
                    <div className="flex flex-wrap justify-center gap-4">
                        {images.map((img, index) => (
                            // <Image
                            //     key={index}
                            //     src={img || "/placeholder.jpg"}
                            //     alt={`Image ${index + 1}`}
                            //     width={300}
                            //     height={300}
                            //     className="rounded-xl object-cover aspect-[3/4] w-[calc(25%-8px)]"
                            //     onError={(e) => {
                            //         const target = e.currentTarget as HTMLImageElement;
                            //         target.src = "/placeholder.jpg";
                            //     }}
                            // />
                            <Image
                                key={index}
                                src={"https://images.unsplash.com/photo-1542531365-8cedfed02b04?q=80&w=2477&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D"}
                                alt={`Image ${index + 1}`}
                                width={300}
                                height={300}
                                className="rounded-xl object-cover aspect-[3/4] w-[calc(25%-8px)]"
                                onError={(e) => {
                                    const target = e.currentTarget as HTMLImageElement;
                                    target.src = "/placeholder.jpg";
                                }}
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}

// app/riders/[slug]/page.tsx
"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { getRiders, RiderDisplay } from "@/shared/model/riders";
import { DividerSvg } from "@/widgets/divider-svg";
import * as React from "react";
import ShapeCanvas from "../../components/ShapeCanvas";

export default function RiderPage() {
    const { slug } = useParams();
    const [rider, setRider] = useState<RiderDisplay | null>(null);

    useEffect(() => {
        getRiders().then((riders) => {
            const found = riders.find((r) => r.slug === slug);
            if (found) setRider(found);
            console.log(found);
        });
    }, [slug]);

    if (!rider) return null;

    return (
        <div className="overflow-x-hidden">
            <div className="relative flex justify-center items-center flex-col w-screen h-[100dvh]">
                <ShapeCanvas className="absolute z-[-1] pointer-events-none filter blur-[20px]" />

                <p className="text-2xl leading-[30px] font-michroma">{rider.sport.join(", ")}</p>
                <h1 className="text-4xl font-bold text-center">{rider.name}</h1>
            </div>

            <div className="flex mt-24 mx-auto max-w-[1200px] gap-10">
                <div className="profile_infos_image w-1/2">
                    <Image
                        src={rider.images?.[0] || "/placeholder.jpg"}
                        alt={rider.name}
                        width={600}
                        height={800}
                        className="rounded-2xl object-cover w-full h-full"
                    />
                </div>
                <div className="profile_infos_content w-1/2">
                    <p className="mb-4 text-sm text-gray-700 whitespace-pre-line">{rider.bio}</p>
                    <div className="profile_infos_stats grid grid-cols-2 gap-4 mb-4">
                        <div>
                            <div className="text-2xl font-bold">{rider.age}</div>
                            <div className="text-sm text-gray-500">ans</div>
                        </div>
                        <div>
                            <div className="text-sm text-gray-700">{rider.location}</div>
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-2">
                        {rider.sport.map((s, i) => (
                            <span key={i} className="px-3 py-1 text-xs border rounded-full bg-gray-100">
                                {s}
                            </span>
                        ))}
                    </div>
                </div>
            </div>

            <div className="profile_medias relative">
                <DividerSvg />

                <div className="mt-32 px-4">
                    <h3 className="mb-6 text-3xl font-[Michroma] text-white uppercase">Images</h3>
                    <div className="flex flex-wrap gap-4">
                        {rider.images.map((img, index) => (
                            <Image
                                key={index}
                                src={img}
                                alt={`Image ${index + 1}`}
                                width={300}
                                height={300}
                                className="rounded-xl object-cover aspect-[3/4] w-[calc(25%-8px)]"
                            />
                        ))}
                    </div>
                </div>
            </div>
        </div>
    );
}
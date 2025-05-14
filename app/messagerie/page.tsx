"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Star, MapPin, DollarSign, Gift, MountainSnow } from "lucide-react";

// Type sponsor enrichi
type Sponsor = {
    id: number;
    name: string;
    logo?: string;
    message: string;
    sport: string;
    location: string;
    budget: string;
    perks: string[];
    description?: string;
    conditions?: string;
    rating?: number;
};

export default function Messagerie() {
    const [sponsors, setSponsors] = useState<Sponsor[]>([]);
    const [selectedSponsor, setSelectedSponsor] = useState<Sponsor | null>(null);
    const [open, setOpen] = useState(false);

    useEffect(() => {
        fetch("/datas/messages.json")
            .then((res) => res.json())
            .then((data) => setSponsors(data));
    }, []);

    return (
        <div className="p-6 text-black bg-white min-h-screen">
            <h2 className="text-2xl font-bold mb-6">Propositions de sponsors</h2>
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                {sponsors.map((sponsor) => (
                    <Card
                        key={sponsor.id}
                        onClick={() => {
                            setSelectedSponsor(sponsor);
                            setOpen(true);
                        }}
                        className="cursor-pointer overflow-hidden rounded-xl hover:shadow-xl transition border border-gray-200 bg-white"
                    >
                        <CardContent className="p-4 relative h-[180px] flex flex-col justify-between">
                            <div className="flex items-center gap-3">
                                {sponsor.logo && (
                                    <Image src={sponsor.logo} alt={sponsor.name} width={36} height={36} className="rounded-full" />
                                )}
                                <div>
                                    <h3 className="text-lg font-semibold text-gray-900 whitespace-nowrap">{sponsor.name}</h3>
                                    <p className="text-sm text-gray-500">{sponsor.location}</p>
                                </div>
                            </div>
                            <div>
                                <div className="flex flex-wrap gap-2 mt-4">
                                    <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">{sponsor.sport}</span>
                                    <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">{sponsor.budget}</span>
                                </div>
                                <p className="text-sm text-gray-600 line-clamp-2 mt-2">{sponsor.message}</p>
                            </div>
                            {/* <div className="absolute top-2 right-2 flex gap-1">
                                {Array.from({ length: 5 }).map((_, i) => (
                                    <Star
                                        key={i}
                                        size={14}
                                        className={
                                            i < (sponsor.rating || 0)
                                                ? "fill-black stroke-black"
                                                : "stroke-gray-300"
                                        }
                                    />
                                ))}
                            </div> */}
                        </CardContent>
                    </Card>
                ))}
            </div>

            <Dialog open={open} onOpenChange={setOpen}>
                <DialogContent className="w-[80vw] h-[90vh] max-w-[80vw] overflow-y-auto p-12 bg-white rounded-xl absolute">
                    {selectedSponsor && (
                        <>
                            <h1 className="absolute top-8 left-1/2 -translate-x-1/2 text-[18rem] font-bold text-gray-100 uppercase tracking-wider pointer-events-none z-0 whitespace-nowrap">
                                {selectedSponsor.name}
                            </h1>

                            <div className="space-y-10 relative z-10">
                                <DialogHeader>
                                    <div className="flex items-center gap-4 relative z-20">
                                        {selectedSponsor.logo && (
                                            <Image src={selectedSponsor.logo} alt={selectedSponsor.name} width={70} height={70} className="rounded-full" />
                                        )}
                                        <DialogTitle className="text-xl font-extrabold text-black relative z-20">
                                            {selectedSponsor.name}
                                        </DialogTitle>
                                    </div>
                                </DialogHeader>

                                <p className="text-xl text-black italic z-20 relative leading-relaxed">
                                    {selectedSponsor.message}
                                </p>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base">
                                    <div className="space-y-4">
                                        <p className="flex items-center gap-2 text-black">
                                            <MountainSnow size={18} /> <strong>Sport :</strong> {selectedSponsor.sport}
                                        </p>
                                        <p className="flex items-center gap-2 text-black">
                                            <MapPin size={18} /> <strong>Lieu :</strong> {selectedSponsor.location}
                                        </p>
                                        <p className="flex items-center gap-2 text-black">
                                            <DollarSign size={18} /> <strong>Budget :</strong> {selectedSponsor.budget}
                                        </p>
                                    </div>
                                    <div className="space-y-4">
                                        <p className="flex items-center gap-2 text-black">
                                            <Gift size={18} /> <strong>Avantages :</strong>
                                        </p>
                                        <ul className="list-disc list-inside text-black">
                                            {selectedSponsor.perks.map((perk, index) => (
                                                <li key={index}>{perk}</li>
                                            ))}
                                        </ul>
                                    </div>
                                </div>

                                {selectedSponsor.description && (
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-semibold text-black">À propos du sponsor</h4>
                                        <Separator />
                                        <p className="text-black leading-relaxed text-base">{selectedSponsor.description}</p>
                                    </div>
                                )}

                                {selectedSponsor.conditions && (
                                    <div className="space-y-2">
                                        <h4 className="text-lg font-semibold text-black">Conditions du partenariat</h4>
                                        <Separator />
                                        <p className="text-black leading-relaxed text-base">{selectedSponsor.conditions}</p>
                                    </div>
                                )}

                                <div className="flex justify-end gap-4 pt-8">
                                    <Button variant="ghost" className="text-black border border-black hover:bg-gray-100">Refuser</Button>
                                    <Button className="bg-black text-white hover:bg-gray-900">Répondre à la proposition</Button>
                                </div>
                            </div>
                        </>
                    )}
                </DialogContent>
            </Dialog>
        </div>
    );
}

"use client";

import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Sparkles } from "lucide-react";

interface RiderSponsorsSectionProps {
    currentSponsors: string[];
    desiredSponsors: string[];
}

export default function RiderSponsorsSection({
    currentSponsors,
    desiredSponsors,
}: RiderSponsorsSectionProps) {
    const hasCurrent = currentSponsors.length > 0;
    const hasDesired = desiredSponsors.length > 0;

    if (!hasCurrent && !hasDesired) return null;

    return (
        <div className="w-full space-y-20" >
            {hasCurrent && (
                <section>
                    <h4 className="text-ml font-medium text-[#101B08]  font-michroma tracking-widest mb-10">
                        Sponsors actuels
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {currentSponsors.map((name, index) => (
                            <Card
                                key={`current-${index}`}
                                className="relative bg-[#F4F3EF] border border-[#B1BD93] overflow-hidden group hover:shadow-2xl transition-all"
                            >
                                <div className="absolute inset-0 bg-[#D2FA52] opacity-0 group-hover:opacity-10 blur-2xl transition duration-500" />
                                <CardHeader className="flex flex-col items-center justify-center py-10">
                                    <CardTitle className="text-[#101B08] text-2xl text-center font-michroma group-hover:scale-105 transition-transform">
                                        {name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center text-sm text-[#3F4139] font-semibold">
                                    <span className="text-[#7B9F2D]">Partenaire officiel</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            )}

            {hasDesired && (
                <section>
                    <h4 className="text-ml font-medium text-[#101B08]  font-michroma tracking-widest mb-10">
                        Sponsors souhaités
                    </h4>
                    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
                        {desiredSponsors.map((name, index) => (
                            <Card
                                key={`desired-${index}`}
                                className="relative bg-white border-2 border-dashed border-[#D2FA52] overflow-hidden group hover:shadow-2xl transition-all"
                            >
                                {/* Halo jaune au hover */}
                                <div className="absolute inset-0 bg-[#D2FA52] opacity-0 group-hover:opacity-10 blur-2xl transition duration-500" />

                                {/* Icône 💭 rêve */}
                                <div className="absolute top-4 right-4 text-[#D2FA52]">
                                    <Sparkles className="w-6 h-6 animate-pulse" />
                                </div>

                                <CardHeader className="flex flex-col items-center justify-center py-10">
                                    <CardTitle className="text-[#101B08] text-2xl text-center font-michroma group-hover:scale-105 transition-transform">
                                        {name}
                                    </CardTitle>
                                </CardHeader>
                                <CardContent className="text-center text-sm text-[#3F4139] font-semibold">
                                    <span className="text-[#B1BD93]">Sponsor souhaité</span>
                                </CardContent>
                            </Card>
                        ))}
                    </div>
                </section>
            )}
        </div>
    );
}

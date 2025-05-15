"use client";

import { useState, useEffect } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Star, MapPin, DollarSign, Gift, MountainSnow } from "lucide-react";
import { Proposition, getPropositions } from "@/shared/model/proposition"
import { MessageThread, getMessages } from "@/shared/model/message";


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
    const [messages, setMessages] = useState<any[]>([]);
    const [selectedConversation, setSelectedConversation] = useState<any | null>(null);
    const [messageDialogOpen, setMessageDialogOpen] = useState(false);

    useEffect(() => {
        async function fetchData() {
            try {
                const [propositions, messages] = await Promise.all([
                    getPropositions(),
                    getMessages()
                ]);
                const messageIds = new Set(messages.map((msg) => msg.id));
                const filtered = propositions.filter((p) => !messageIds.has(p.id));
    
                setMessages(messages);
                setSponsors(filtered);
            } catch (err) {
                console.error("Erreur chargement data:", err);
            }
        }
        fetchData();
    }, []);

    return (
        <div className="p-6 text-black bg-white min-h-screen">
            <Button variant="ghost" className="fixed right-6 top-6 bg-black border border-transparent text-white hover:bg-white hover:text-black hover:border-black">Nouveau message</Button>
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
                <DialogContent className="w-[80vw] h-[90vh] max-w-[80vw] overflow-y-auto p-12 bg-white rounded-xl absolute overflow-x-hidden">
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

            <h2 className="text-2xl font-bold mb-6 mt-12">Messages</h2>
            <div className="space-y-4">
                {messages.map((conversation) => (
                    <div
                        key={conversation.id}
                        onClick={() => {
                            setSelectedConversation(conversation);
                            setMessageDialogOpen(true);
                        }}
                        className="w-full p-4 flex items-center justify-between bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg transition"
                    >
                        <div className="flex items-center gap-4">
                            <Image src={conversation.logo} alt={conversation.name} width={40} height={40} className="rounded-full" />
                            <div>
                                <p className="font-semibold text-black">{conversation.name}</p>
                                <p className="text-sm text-gray-600 truncate w-[240px]">{conversation.lastMessage.slice(0, 90)}{conversation.lastMessage.length > 90 ? "..." : ""}</p>
                            </div>
                        </div>
                        <span className="text-sm text-gray-500">{conversation.lastDate}</span>
                    </div>
                ))}
            </div>

            <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
                <DialogContent className="w-[80vw] max-w-[80vw] h-[90vh] overflow-y-auto p-8 bg-white rounded-xl">
                    {selectedConversation && (
                        <div className="space-y-8">
                            {/* Header marque */}
                            <div className="flex items-center gap-4">
                                <Image src={selectedConversation.logo} alt={selectedConversation.name} width={60} height={60} className="rounded-full" />
                                <div>
                                    <h3 className="text-xl font-bold">{selectedConversation.name}</h3>
                                    <p className="text-gray-500">{selectedConversation.location}</p>
                                </div>
                            </div>

                            {/* Récapitulatif de la proposition */}
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base">
                                <div className="space-y-4">
                                    <p className="flex items-center gap-2 text-black">
                                        <MountainSnow size={18} /> <strong>Sport :</strong> {selectedConversation.sport}
                                    </p>
                                    <p className="flex items-center gap-2 text-black">
                                        <MapPin size={18} /> <strong>Lieu :</strong> {selectedConversation.location}
                                    </p>
                                    <p className="flex items-center gap-2 text-black">
                                        <DollarSign size={18} /> <strong>Budget :</strong> {selectedConversation.budget}
                                    </p>
                                </div>
                                <div className="space-y-4">
                                    <p className="flex items-center gap-2 text-black">
                                        <Gift size={18} /> <strong>Avantages :</strong>
                                    </p>
                                    <ul className="list-disc list-inside text-black">
                                        {selectedConversation.perks.map((perk: string, index: number) => (
                                            <li key={index}>{perk}</li>
                                        ))}
                                    </ul>
                                </div>
                            </div>

                            {selectedConversation.description && (
                                <div className="space-y-2 mt-6">
                                    <h4 className="text-lg font-semibold text-black">À propos du sponsor</h4>
                                    <Separator />
                                    <p className="text-black leading-relaxed text-base">{selectedConversation.description}</p>
                                </div>
                            )}

                            {selectedConversation.conditions && (
                                <div className="space-y-2 mt-6">
                                    <h4 className="text-lg font-semibold text-black">Conditions du partenariat</h4>
                                    <Separator />
                                    <p className="text-black leading-relaxed text-base">{selectedConversation.conditions}</p>
                                </div>
                            )}


                            {/* Messages */}
                            <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                                <h4 className="text-lg font-semibold text-black">Messages</h4>
                                <Separator />
                                <div className=" max-w-[40vw] mr-auto">
                                    {selectedConversation.messages.map((msg: any, i: number) => (
                                        <div key={i} className={`p-3 rounded-lg ${msg.from === 'me' ? 'bg-black text-white ml-auto max-w-[70%]' : 'bg-gray-200 text-black mr-auto max-w-[70%]'}`}>
                                            <p className="text-sm">{msg.text}</p>
                                            <p className="text-xs mt-1 text-right opacity-60">{msg.date}</p>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Actions */}
                            <div className="pt-4 flex justify-end">
                                <Button className="bg-black text-white hover:bg-gray-900">Répondre</Button>
                            </div>
                        </div>
                    )}
                </DialogContent>
            </Dialog>


        </div>
    );
}

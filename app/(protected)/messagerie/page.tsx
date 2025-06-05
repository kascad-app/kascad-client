"use client";

import { useEffect, useState } from "react";
import { Card, CardContent } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Separator } from "@/components/ui/separator";
import Image from "next/image";
import { Star, MapPin, DollarSign, Gift, MountainSnow } from "lucide-react";
import { contractOfferDto } from "@kascad-app/shared-types";
import { set } from "zod";
import {
  useGetContract,
  useGetContracts,
} from "@/entities/contracts/contracts.hook";

export default function Messagerie() {
  const [selectedSponsor, setSelectedSponsor] =
    useState<contractOfferDto | null>(null);
  const [selectedSponsorId, setSelectedSponsorId] = useState<string | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const [messages, setMessages] = useState<any[]>([]);
  const [selectedConversation, setSelectedConversation] = useState<any | null>(
    null,
  );
  const [messageDialogOpen, setMessageDialogOpen] = useState(false);
  const [showResponseInput, setShowResponseInput] = useState(false);
  const [responseText, setResponseText] = useState("");

  const { data: contracts = [], isLoading, error } = useGetContracts();

  const findMutation = useGetContract(selectedSponsorId!);

  function handleCardClick(contractId: string): void {
    setSelectedSponsorId(contractId);
  }

  useEffect(() => {
    if (selectedSponsorId) {
      findMutation.trigger().then((data) => {
        if (data) {
          setSelectedSponsor(data);
          setOpen(true);
        } else {
          console.error("Contract not found");
        }
      });
    } else {
      setSelectedSponsor(null);
      setOpen(false);
    }
  }, [selectedSponsorId]);

  return (
    <div className="p-6 text-black bg-white min-h-screen">
      <Button
        variant="ghost"
        className="fixed right-6 top-6 bg-black border border-transparent text-white hover:bg-white hover:text-black hover:border-black"
      >
        Nouveau message
      </Button>
      <h2 className="text-2xl font-bold mb-6">Propositions de sponsors</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {contracts.map((contract: contractOfferDto) => (
          <Card
            key={contract._id}
            onClick={() => handleCardClick(contract._id)}
            className="cursor-pointer overflow-hidden rounded-xl hover:shadow-xl transition border border-gray-200 bg-white"
          >
            <CardContent className="p-4 relative h-[180px] flex flex-col justify-between">
              <div className="absolute top-4 right-4 z-10">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <h3 className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                    {contract.sponsorName}
                  </h3>
                  <p className="text-sm text-gray-500">
                    {contract.sponsorMail}
                  </p>
                </div>
              </div>

              <div>
                {contract.sport && (
                  <div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                        {contract._id}
                      </span>
                    </div>
                  </div>
                )}
                {contract.description && (
                  <p className="text-sm text-gray-600 line-clamp-2 mt-2">
                    {contract.description}
                  </p>
                )}
              </div>
            </CardContent>
          </Card>
        ))}
      </div>

      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="w-[80vw] h-[90vh] max-w-[80vw] overflow-y-auto p-12 bg-white rounded-xl absolute overflow-x-hidden">
          {selectedSponsor ? (
            <DialogTitle className="text-xl font-extrabold text-black relative z-20">
              {selectedSponsor.sponsorName}
            </DialogTitle>
          ) : (
            <DialogTitle className="text-xl font-extrabold text-black relative z-20">
              Offre de Contrat
            </DialogTitle>
          )}
          {selectedSponsor ? (
            <>
              <h1 className="absolute top-8 left-1/2 -translate-x-1/2 text-[18rem] font-bold text-gray-100 uppercase tracking-wider pointer-events-none z-0 whitespace-nowrap">
                {selectedSponsor.sponsorName}
              </h1>

              <div className="space-y-10 relative z-10">
                <DialogHeader>
                  <div className="flex items-center gap-4 relative z-20">
                    <DialogTitle className="text-xl font-extrabold text-black relative z-20">
                      {selectedSponsor.sponsorName}
                    </DialogTitle>
                  </div>
                </DialogHeader>

                {/* <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base">
                                    <div className="space-y-4">
                                        <p className="flex items-center gap-2 text-black">
                                            <MountainSnow size={18} /> <strong>Sport :</strong> {selectedSponsor.sport.join(', ')}
                                        </p>
                                    </div>
                                </div> */}

                <div className="flex flex-col gap-4 pt-8">
                  <div className="flex justify-end gap-4">
                    <Button
                      variant="ghost"
                      className="text-black border border-black hover:bg-gray-100"
                    >
                      Refuser
                    </Button>
                    <Button
                      className="bg-black text-white hover:bg-gray-900"
                      onClick={() => setShowResponseInput(true)}
                    >
                      Répondre à la proposition
                    </Button>
                  </div>

                  {showResponseInput && (
                    <div className="flex items-end gap-2 mt-2">
                      <textarea
                        rows={1}
                        placeholder="Écrire une réponse..."
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        className="w-full resize-none overflow-hidden p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = "auto";
                          target.style.height = `${target.scrollHeight}px`;
                        }}
                      />
                      <Button
                        className="bg-black text-white hover:bg-gray-900"
                        onClick={() => {
                          console.log("Message envoyé:", responseText);
                          setResponseText("");
                          setShowResponseInput(false);
                        }}
                      >
                        Envoyer
                      </Button>
                    </div>
                  )}
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Chargement ...</p>
          )}
        </DialogContent>
      </Dialog>

      <h2 className="text-2xl font-bold mb-6 mt-12">Messages</h2>
      <div className="space-y-4">
        {messages.map((conversation: any) => {
          const lastMessage =
            conversation.messages?.[conversation.messages.length - 1];
          const isFromSponsor = lastMessage?.from !== "me";

          return (
            <div
              key={conversation.id}
              onClick={() => {
                setSelectedConversation(conversation);
                setMessageDialogOpen(true);
              }}
              className="relative w-full p-4 flex items-center justify-between bg-gray-100 hover:bg-gray-200 cursor-pointer rounded-lg transition"
            >
              {/* Ping en haut à gauche si message du sponsor */}
              {isFromSponsor && (
                <span className="absolute top-2 left-2 flex h-2 w-2 z-10">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
              )}

              <div className="flex items-center gap-4">
                <Image
                  src={conversation.logo}
                  alt={conversation.name}
                  width={40}
                  height={40}
                  className="rounded-full"
                />
                <div>
                  <p className="font-semibold text-black">
                    {conversation.name}
                  </p>
                  <p className="text-sm text-gray-600 truncate w-[240px]">
                    {conversation.lastMessage.slice(0, 90)}
                    {conversation.lastMessage.length > 90 ? "..." : ""}
                  </p>
                </div>
              </div>
              <span className="text-sm text-gray-500">
                {conversation.lastDate}
              </span>
            </div>
          );
        })}
      </div>

      <Dialog open={messageDialogOpen} onOpenChange={setMessageDialogOpen}>
        <DialogContent className="w-[80vw] h-[90vh] max-w-[80vw] overflow-y-auto p-12 bg-white rounded-xl absolute overflow-x-hidden">
          {selectedConversation ? (
            <>
              <DialogHeader>
                <div className="flex items-center gap-4">
                  <Image
                    src={selectedConversation.logo}
                    alt={selectedConversation.name}
                    width={60}
                    height={60}
                    className="rounded-full"
                  />
                  <div>
                    <DialogTitle className="text-xl font-bold">
                      {selectedConversation.name}
                    </DialogTitle>
                    <p className="text-gray-500">
                      {selectedConversation.location}
                    </p>
                  </div>
                </div>
              </DialogHeader>
              <div className="space-y-8 mt-4">
                <div className="space-y-8">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-10 text-base">
                    <div className="space-y-4">
                      <p className="flex items-center gap-2 text-black">
                        <MountainSnow size={18} /> <strong>Sport :</strong>{" "}
                        {selectedConversation.sport}
                      </p>
                      <p className="flex items-center gap-2 text-black">
                        <MapPin size={18} /> <strong>Lieu :</strong>{" "}
                        {selectedConversation.location}
                      </p>
                      <p className="flex items-center gap-2 text-black">
                        <DollarSign size={18} /> <strong>Budget :</strong>{" "}
                        {selectedConversation.budget}
                      </p>
                    </div>
                    <div className="space-y-4">
                      <p className="flex items-center gap-2 text-black">
                        <Gift size={18} /> <strong>Avantages :</strong>
                      </p>
                      <ul className="list-disc list-inside text-black">
                        {selectedConversation.perks.map(
                          (perk: string, index: number) => (
                            <li key={index}>{perk}</li>
                          ),
                        )}
                      </ul>
                    </div>
                  </div>

                  {selectedConversation.description && (
                    <div className="space-y-2 mt-6">
                      <h4 className="text-lg font-semibold text-black">
                        À propos du sponsor
                      </h4>
                      <Separator />
                      <p className="text-black leading-relaxed text-base">
                        {selectedConversation.description}
                      </p>
                    </div>
                  )}

                  {selectedConversation.conditions && (
                    <div className="space-y-2 mt-6">
                      <h4 className="text-lg font-semibold text-black">
                        Conditions du partenariat
                      </h4>
                      <Separator />
                      <p className="text-black leading-relaxed text-base">
                        {selectedConversation.conditions}
                      </p>
                    </div>
                  )}

                  {/* Messages */}
                  <div className="space-y-4 max-h-[40vh] overflow-y-auto pr-2">
                    <h4 className="text-lg font-semibold text-black">
                      Messages
                    </h4>
                    <Separator />
                    <div className="space-y-6">
                      {selectedConversation.messages.map(
                        (msg: any, i: number) => (
                          <div
                            key={i}
                            className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm"
                          >
                            <div className="text-sm text-gray-500 mb-2">
                              <p>
                                <strong>From: </strong>
                                {msg.from === "me" ? (
                                  "Vous"
                                ) : (
                                  <span
                                    className={
                                      msg.from !== "me"
                                        ? "text-blue-600 font-semibold"
                                        : "text-gray-800"
                                    }
                                  >
                                    {selectedConversation.name}
                                  </span>
                                )}
                              </p>
                              <p>
                                <strong>Date:</strong> {msg.date}
                              </p>
                            </div>
                            <div className="text-base text-black whitespace-pre-line">
                              {msg.text}
                            </div>
                          </div>
                        ),
                      )}
                    </div>
                  </div>

                  {/* Zone de réponse fixe en bas */}
                  <div className="fixed bottom-8 left-1/2 -translate-x-1/2 w-[72vw] bg-white pt-4">
                    <div className="flex items-end gap-2">
                      <textarea
                        rows={1}
                        placeholder="Écrire une réponse..."
                        className="w-full resize-none overflow-hidden p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                        onInput={(e) => {
                          const target = e.target as HTMLTextAreaElement;
                          target.style.height = "auto";
                          target.style.height = `${target.scrollHeight}px`;
                        }}
                      />
                      <Button className="bg-black text-white hover:bg-gray-900">
                        Envoyer
                      </Button>
                    </div>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <p className="text-center text-gray-500">Chargement ...</p>
          )}
        </DialogContent>
      </Dialog>
    </div>
  );
}

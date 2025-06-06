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
import { CornerDownRight, Gift, MountainSnow, Calendar, CalendarX2, CalendarCheck2 } from "lucide-react";
import { contractOfferDto, registerMessageDto } from "@kascad-app/shared-types";
import { set } from "zod";
import {
  useGetContract,
  useGetContracts,
  useSendMessage,
} from "@/entities/contracts/contracts.hook";
import { toast } from "sonner";

export default function Messagerie() {
  const [selectedSponsor, setSelectedSponsor] =
    useState<contractOfferDto | null>(null);
  const [selectedSponsorId, setSelectedSponsorId] = useState<string | null>(
    null,
  );
  const [open, setOpen] = useState(false);
  const [showResponseInput, setShowResponseInput] = useState(false);
  const [responseText, setResponseText] = useState("");
  const [refreshTrigger, setRefreshTrigger] = useState(false);


  const { data: contracts = [], isLoading, error } = useGetContracts();

  const findMutation = useGetContract(selectedSponsorId!);
  const sendMessageMutation = useSendMessage(selectedSponsorId!);

  function handleCardClick(contractId: string): void {
    if (contractId === selectedSponsorId) {
      setSelectedSponsorId(null);
      setTimeout(() => setSelectedSponsorId(contractId), 0);
    } else {
      setSelectedSponsorId(contractId);
    }
  }

  useEffect(() => {
    if (selectedSponsorId) {
      findMutation.trigger().then((data) => {
        if (data) {
          setSelectedSponsor(data);
          setOpen(true);
          console.log("Selected contract:", data);
        } else {
          console.error("Contract not found");
        }
      });
    } else {
      setSelectedSponsor(null);
      setOpen(false);
      setShowResponseInput(false)
    }
  }, [selectedSponsorId, refreshTrigger]);

  const newContracts = contracts.filter(
    (contract: contractOfferDto) => contract.isNew,
  );
  const oldContracts = contracts.filter(
    (contract: contractOfferDto) => !contract.isNew,
  );

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
        {newContracts.map((contract: contractOfferDto) => (
          <Card
            key={contract._id}
            onClick={() => handleCardClick(contract._id)}
            className="cursor-pointer overflow-hidden rounded-xl hover:shadow-xl transition border border-gray-200 bg-white"
          >
            <CardContent className="p-4 relative h-[180px] flex flex-col justify-between">
              <div className="absolute top-4 right-4 z-10">
                <span className="relative flex h-2 w-2">
                  {!contract.isOpenByRider && 
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                  }
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <div className="flex flex-row">
                    {contract.sponsorAvatar && (
                      <img src={contract.sponsorAvatar} alt={contract.sponsorName} width={36} height={36} className="rounded-full mr-4" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                      {contract.sponsorName}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {contract.sponsorMail}
                  </p>
                </div>
              </div>
              <div>
                <div>
                  <div className="flex flex-wrap gap-2 mt-4">
                    {contract.sport && (
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                        {contract.sport}
                      </span>
                    )}
                  </div>
                </div>
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

      <h2 className="text-2xl font-bold mb-6 mt-8">Messages</h2>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {oldContracts.map((contract: contractOfferDto) => (
          <Card
            key={contract._id}
            onClick={() => handleCardClick(contract._id)}
            className="cursor-pointer overflow-hidden rounded-xl hover:shadow-xl transition border border-gray-200 bg-white"
          >
            <CardContent className="p-4 relative h-[180px] flex flex-col justify-between">
              <div className="absolute top-4 right-4 z-10">
                <span className="relative flex h-2 w-2">
                  {!contract.isOpenByRider && 
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-blue-600 opacity-75"></span>
                  }
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-blue-600"></span>
                </span>
              </div>

              <div className="flex items-center gap-3">
                <div>
                  <div className="flex flex-row">
                    {contract.sponsorAvatar && (
                      <img src={contract.sponsorAvatar} alt={contract.sponsorName} width={36} height={36} className="rounded-full mr-4" />
                    )}
                    <h3 className="text-lg font-semibold text-gray-900 whitespace-nowrap">
                      {contract.sponsorName}
                    </h3>
                  </div>
                  <p className="text-sm text-gray-500 mt-2">
                    {contract.sponsorMail}
                  </p>
                </div>
              </div>
              <div>
                <div className="flex flex-wrap gap-2 mt-4">
                  {contract.sport &&
                    <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">{contract.sport}</span>
                  }
                  {/* <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">{contract.budget}</span> */}
                </div>
                {/* <p className="text-sm text-gray-600 line-clamp-2 mt-2">{contract.message}</p> */}
              </div>

              <div>
                {contract.sport && (
                  <div>
                    <div className="flex flex-wrap gap-2 mt-4">
                      <span className="bg-gray-200 text-gray-800 text-xs px-2 py-1 rounded">
                        {contract.sport}
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

      <Dialog
        open={open}
        onOpenChange={(isOpen) => {
          setOpen(isOpen);
          if (!isOpen) {
            setSelectedSponsor(null);
            setSelectedSponsorId(null);
          }
        }}
      >
        <DialogContent className="w-[80vw] h-[90vh] max-w-[80vw] overflow-y-auto p-12 bg-white rounded-xl absolute overflow-x-hidden">
          {selectedSponsor ? (
            <DialogTitle className="text-xl font-extrabold text-black relative z-20">
              <p>{selectedSponsor.sponsorName}</p>
            </DialogTitle>
          ) : (
            <DialogTitle className="text-xl font-extrabold text-black relative z-20">
              Offre de Contrat
            </DialogTitle>
          )}
          {selectedSponsor ? (
            <>
              <h3 className="absolute top-8 left-1/2 -translate-x-1/2 text-[18rem] font-bold text-gray-100 uppercase tracking-wider pointer-events-none z-[-1] whitespace-nowrap">
                {selectedSponsor.sponsorName}
              </h3>
              <div className="flex flex-col gap-4 pt-20">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-20 text-base">
                  <div className="space-y-4">
                    {selectedSponsor.sport && 
                      <p className="flex items-center gap-2 text-black">
                        <MountainSnow size={18} /> <strong>Sport :</strong> {selectedSponsor.sport}
                      </p>
                    }
                    {selectedSponsor.type &&
                      <p className="flex items-center gap-2 text-black">
                        <CornerDownRight size={18} /> <strong>Type :</strong> {selectedSponsor.type}
                      </p>
                    }
                    { selectedSponsor.startDate && 
                      <p className="flex items-center gap-2 text-black">
                        <CalendarCheck2 size={18} /> <strong>Début :</strong> {selectedSponsor.startDate ? new Date(selectedSponsor.startDate).toLocaleDateString() : 'N/A'}
                      </p>
                    }
                  {selectedSponsor.endDate &&
                    <p className="flex items-center gap-2 text-black">
                      <CalendarX2 size={18} /> <strong>Fin :</strong> {selectedSponsor.endDate ? new Date(selectedSponsor.endDate).toLocaleDateString() : 'N/A'}
                  </p>
                  }
                  </div>
                  {selectedSponsor.perks ? (
                    <div className="space-y-4">
                      <p className="flex items-center gap-2 text-black">
                          <Gift size={18} /> <strong>Avantages :</strong>
                      </p>
                      <ul className="list-disc list-inside text-black">
                        {selectedSponsor.perks.map((perk, index) => (
                            <li key={index}>{perk}</li>
                        ))}
                      </ul>
                    </div>) : (<></>)
                  }
                </div>

              <div className="space-y-10 relative z-10">

                  {selectedSponsor.description && (
                    <div className="space-y-2">
                      <h4 className="text-lg font-semibold text-black">À propos du sponsor</h4>
                      <Separator />
                      <p className="text-black leading-relaxed text-base">{selectedSponsor.description}</p>
                    </div>
                  )}

                  <div className="space-y-6 mt-6">
                    {selectedSponsor.messages.map((msg: any, i: number) => (
                      <div key={i} className="p-4 border border-gray-200 rounded-lg bg-white shadow-sm">
                      <div className="text-sm text-gray-500 mb-2">
                      <div className="flex justify-between w-full">
                        <p>
                          <strong>From: </strong> 
                          <span className={msg.authorType !== "sponsor" ? "text-blue-600 font-semibold" : "text-gray-800"}>
                            {msg.authorMail}
                          </span>
                        </p>
                        <p>{new Date(msg.createdAt).toLocaleDateString()}</p>
                      </div>
                      </div>
                      <div className="text-base text-black whitespace-pre-line"> 
                        {msg.content}
                      </div>
                      </div>
                    ))}
                  </div>
                  {!showResponseInput && 
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
                  }

                  {showResponseInput && (
                    <div className="flex items-end gap-2 mt-2">
                      <textarea
                        rows={1}
                        placeholder="Écrire une réponse..."
                        value={responseText}
                        onChange={(e) => setResponseText(e.target.value)}
                        className="w-full resize-none overflow-hidden p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-black text-black"
                      />
                      <Button
                        className="bg-black text-white hover:bg-gray-900"
                        onClick={() => {
                          sendMessageMutation.trigger({
                            content: responseText,
                          })
                          .then(async (res) => {
                            toast.success("Message sent");
                            setResponseText("");
                            setShowResponseInput(false);
                            setRefreshTrigger((prev) => !prev);
                          })
                          .catch((err) => {
                            toast.error("Message failed");
                          });
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
    </div>
  );
}

"use client";
import Link from "next/link";
import { useState } from "react";
import Avatar from "@/widgets/avatar/avatar.ui";
import { Span } from "next/dist/trace";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { MessageCircle } from "lucide-react";
import { Button } from "@components/ui/button";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogFooter,
  AlertDialogTitle,
  AlertDialogDescription,
  AlertDialogAction,
  AlertDialogCancel,
} from "@/components/ui/alert-dialog";
import { useGetOrCreateConversation } from "@/entities/direct-messages/conversations.hooks";
import { ProfileType, ConversationType } from "@kascad-app/shared-types";
// import { formatDate } from "@/shared/utils/date/date.utils";

// Fonction utilitaire pour formater la date en français
function formatDateFr(dateString: string) {
  if (!dateString) return "";
  const date = new Date(dateString);
  return date.toLocaleDateString("fr-FR", {
    day: "numeric",
    month: "long",
    year: "numeric",
  });
}

export default function SponsorCard({ sponsor }: { sponsor: any }) {
  const sponsorName = sponsor.identity.companyName.toLowerCase();
  const sportNames =
    sponsor.preferences?.sports?.map(
      (sponsorSport: any) => sponsorSport.name,
    ) || [];
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const { trigger } = useGetOrCreateConversation();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        className="block relative rounded-lg overflow-hidden shadow-sm hover:shadow-md transition bg-white h-full focus:outline-none focus:ring-2 focus:ring-blue-500 cursor-pointer"
        tabIndex={0}
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(true);
        }}
        role="button"
        aria-label={`Voir les détails de ${sponsorName}`}
      >
        <div className="w-full h-32 bg-gray-50 flex items-center justify-center relative overflow-hidden">
          {sponsor.avatarUrl ? (
            <img
              src={sponsor.avatarUrl}
              alt={sponsorName}
              className="w-32 h-32 z-[2] object-contain"
            />
          ) : (
            <img
              src="/favicon.ico"
              alt="Pas d'avatar"
              className="w-20 h-20 z-[2] object-contain opacity-15 grayscale"
            />
          )}
          <div className="absolute top-0 left-0 z-[1] w-full h-full flex flex-col items-center justify-center pointer-events-none">
            {Array.from({ length: 5 }).map((_, i) => (
              <div key={i} className="flex flex-row w-full justify-center">
                {Array.from({ length: 15 }).map((_, y) => (
                  <span
                    key={y}
                    className="text-gray-200 text-xl font-black mx-1 select-none"
                  >
                    {sportNames.length > 0 ? sportNames.join(" ") : sponsorName}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>
        <div className="p-4 flex flex-col gap-2">
          <h3 className="font-bold text-lg mb-1 truncate text-[#101B08]">
            {sponsorName}
          </h3>

          <div className="flex items-center gap-2 text-xs text-gray-500 mb-1">
            <span className="font-semibold">
              {sponsor.location || (
                <span className="italic text-gray-400">
                  Localisation inconnue
                </span>
              )}
            </span>
            {sponsor.level && (
              <span className="px-2 py-0.5 rounded bg-[#B1BD93]/20 text-primary-green font-bold">
                {sponsor.level}
              </span>
            )}
          </div>

          <div className="flex flex-wrap gap-1 text-xs mb-1">
            {sportNames.length > 0 ? (
              sportNames.map((sport: string, i: number) => (
                <span
                  key={i}
                  className="bg-[#B1BD93]/20 text-primary-green px-2 py-0.5 rounded-full font-semibold"
                >
                  {sport}
                </span>
              ))
            ) : (
              <span className="italic text-gray-400">
                Aucun sport renseigné
              </span>
            )}
          </div>

          <div className="text-sm text-gray-700 mt-2">
            {sponsor.description ? (
              sponsor.description.length > 60 ? (
                sponsor.description.slice(0, 60) + "…"
              ) : (
                sponsor.description
              )
            ) : (
              <span className="italic text-gray-400">
                Aucune description renseignée
              </span>
            )}
          </div>
        </div>
      </div>
      <DialogContent className="w-[90vw] max-w-2xl md:max-w-3xl lg:max-w-4xl h-[60vh] overflow-y-auto p-8 bg-white rounded-xl">
        <div className="flex flex-col gap-8">
          {/* Header: Avatar, Name, Location, Level, Date */}
          <div className="flex flex-row items-center gap-6 border-b pb-6">
            {sponsor.avatarUrl ? (
              <img
                src={sponsor.avatarUrl}
                alt={sponsorName}
                className="w-28 h-28 rounded-xl object-contain bg-gray-50"
              />
            ) : (
              <img
                src="/favicon.ico"
                alt="Pas d'avatar"
                className="w-20 h-20 rounded-xl object-contain opacity-50 grayscale bg-gray-50"
              />
            )}
            <div className="flex flex-col gap-2 flex-1">
              <DialogTitle className="text-3xl font-bold text-black mb-1">
                {sponsorName}
              </DialogTitle>
              <div className="flex items-center gap-2 text-xs text-gray-500">
                <span className="font-semibold">
                  {sponsor.location || (
                    <span className="italic text-gray-400">
                      Localisation inconnue
                    </span>
                  )}
                </span>
                {sponsor.level && (
                  <span className="px-2 py-0.5 rounded bg-[#B1BD93]/20 text-primary-green font-bold">
                    {sponsor.level}
                  </span>
                )}
              </div>
              {/* Date et bouton sur la même ligne, alignés */}
              <div className="flex items-center justify-between mt-4 w-full">
                <span className="text-xs text-gray-400">
                  Rejoint le {formatDateFr(sponsor.createdAt)}
                </span>
                <Button
                  className="bg-black text-white hover:bg-gray-900 px-3 py-1 rounded flex items-center gap-2 text-xs font-semibold"
                  aria-label="Contacter le sponsor"
                  type="button"
                  onClick={() => setAlertOpen(true)}
                >
                  Envoyer un message
                </Button>
                {/* AlertDialog pour confirmation de démarrage de conversation */}
                <AlertDialog open={alertOpen} onOpenChange={setAlertOpen}>
                  <AlertDialogContent>
                    <AlertDialogHeader>
                      <AlertDialogTitle>
                        Démarrer une conversation ?
                      </AlertDialogTitle>
                      <AlertDialogDescription>
                        Voulez-vous démarrer une conversation avec ce sponsor ?
                      </AlertDialogDescription>
                    </AlertDialogHeader>
                    <AlertDialogFooter>
                      <AlertDialogCancel>Annuler</AlertDialogCancel>
                      <AlertDialogAction
                        onClick={() => {
                          trigger({
                            targetUserId: sponsor.id,
                            targetUserType: ProfileType.SPONSOR,
                            context: {
                              type: ConversationType.PRIVATE,
                              referenceId: undefined,
                            },
                          });
                          setAlertOpen(false);
                        }}
                      >
                        Démarrer
                      </AlertDialogAction>
                    </AlertDialogFooter>
                  </AlertDialogContent>
                </AlertDialog>
              </div>
            </div>
          </div>

          {/* Sports */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Sports</h4>
            <div className="flex flex-wrap gap-2">
              {sportNames.length > 0 ? (
                sportNames.map((sport: string, i: number) => (
                  <span
                    key={i}
                    className="bg-[#B1BD93]/20 text-primary-green px-3 py-1 rounded-full font-semibold text-xs"
                  >
                    {sport}
                  </span>
                ))
              ) : (
                <span className="italic text-gray-400">
                  Aucun sport renseigné
                </span>
              )}
            </div>
          </div>

          {/* Description & Website */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Description</h4>
            <p className="text-gray-700 text-base mb-2">
              {sponsor.description || (
                <span className="italic text-sm text-gray-400">
                  Aucune description disponible.
                </span>
              )}
            </p>
            {sponsor.website ? (
              <a
                href={sponsor.website}
                target="_blank"
                rel="noopener noreferrer"
                className="text-blue-600 hover:underline text-xs"
              >
                {sponsor.website}
              </a>
            ) : (
              <p className="italic text-sm text-gray-400">
                Aucun site web renseigné
              </p>
            )}
          </div>

          {/* Valeurs */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Valeurs</h4>
            {sponsor.values && sponsor.values.length > 0 ? (
              <ul className="list-disc list-inside text-gray-700">
                {sponsor.values.map((value: string, i: number) => (
                  <li key={i}>{value}</li>
                ))}
              </ul>
            ) : (
              <p className="italic text-sm text-gray-400">
                Aucune valeur renseignée
              </p>
            )}
          </div>

          {/* Partenaires */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Partenaires</h4>
            {sponsor.partnerships && sponsor.partnerships.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {sponsor.partnerships.map((partnership: any, i: number) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1"
                  >
                    {partnership.image && (
                      <img
                        src={partnership.image}
                        alt={partnership.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <span>{partnership.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="italic text-sm text-gray-400">
                Aucun partenaire renseigné
              </p>
            )}
          </div>

          {/* Athlètes */}
          <div>
            <h4 className="font-semibold text-lg mb-2">Athlètes</h4>
            {sponsor.athletes && sponsor.athletes.length > 0 ? (
              <ul className="flex flex-wrap gap-2">
                {sponsor.athletes.map((athlete: any, i: number) => (
                  <li
                    key={i}
                    className="flex items-center gap-2 bg-gray-100 rounded px-2 py-1"
                  >
                    {athlete.image && (
                      <img
                        src={athlete.image}
                        alt={athlete.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )}
                    <span>{athlete.name}</span>
                  </li>
                ))}
              </ul>
            ) : (
              <p className="italic text-sm text-gray-400">
                Aucun athlète renseigné
              </p>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}

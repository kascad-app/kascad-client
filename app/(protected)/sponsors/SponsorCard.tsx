"use client";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle
} from "@/components/ui/alert-dialog";
import {
  Dialog,
  DialogContent,
  DialogTitle
} from "@/components/ui/dialog";
import { useGetOrCreateConversation } from "@/entities/direct-messages/conversations.hooks";
import { ROUTES } from "@/shared/constants/ROUTES";
import { cn } from "@/shared/lib/fetch/cn";
import { Button } from "@components/ui/button";
import { ConversationType, ProfileType } from "@kascad-app/shared-types";
import { delay } from "framer-motion";
import { useRouter } from "next/navigation";
import { useState } from "react";
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

export default function SponsorCard({ sponsor }: { sponsor: any; }) {
  const router = useRouter();
  const sponsorName = sponsor.identity.companyName.toLowerCase();
  const sportNames =
    sponsor.preferences?.sports?.map(
      (sponsorSport: any) => sponsorSport,
    ) || [];
  const [open, setOpen] = useState(false);
  const [alertOpen, setAlertOpen] = useState(false);
  const { trigger } = useGetOrCreateConversation();
  return (
    <Dialog open={open} onOpenChange={setOpen}>
      <div
        onClick={() => setOpen(true)}
        onKeyDown={(e) => {
          if (e.key === "Enter" || e.key === " ") setOpen(true);
        }}
        tabIndex={0}
        role="button"
        aria-label={`Voir les détails de ${sponsorName}`}
        className="relative group cursor-pointer  bg-white border border-[#E5E7EB] hover:border-[#D2FA52] transition-all duration-300 rounded-3xl p-6 shadow-sm hover:shadow-lg w-full h-72 overflow-hidden flex flex-col justify-between"
      >
        <div className="absolute right-0 bottom-0 h-[200%] w-full bg-gradient-to-l from-transparent via-[#ffffffbc] to-[#ffffff] pointer-events-none z-0 overflow-hidden">
          <div className="absolute w-[200%] h-[200%] text-[#101b0842] opacity-20 font-extrabold uppercase text-5xl tracking-tight leading-none select-none whitespace-nowrap mix-blend-overlay rotate-[-45deg] group-hover:animate-scroll-diag">
            {Array.from({ length: 20 }).map((_, i) => (
              <div key={i} className="flex flex-row gap-8">
                {Array.from({ length: 8 }).map((_, j) => (
                  <span key={`${i}-${j}`} className="drop-shadow-md">
                    {sponsorName}
                  </span>
                ))}
              </div>
            ))}
          </div>
        </div>


        {/* CONTENU TEXTE */}
        <div className="relative z-10 flex items-center gap-4">
          <div className="w-20 h-20 bg-transparent  shrink-0 rounded-[1px]">
            <img
              src={sponsor.avatarUrl || "/favicon.ico"}
              alt={sponsorName}
              className={cn(
                "w-full h-full rounded-xs object-contain grayscale group-hover:grayscale-0 transition duration-300",
                (!sponsor.avatarUrl || sponsor.avatarUrl === "/favicon.ico") && "opacity-10"
              )}
            />
          </div>

          <div className="flex flex-col justify-start w-full">
            <h3 className="font-semibold text-xl text-[#101B08] capitalize leading-tight">
              {sponsorName}
            </h3>
            <p className="text-xs text-gray-500 mt-1">
              {sponsor.location || (
                <span className="italic text-gray-400">Localisation inconnue</span>
              )}
            </p>
          </div>
        </div>

        {/* TAGS + DESCRIPTION */}
        <div className="relative z-10 mt-4 flex flex-wrap gap-2">
          {sportNames.length > 0 ? (
            sportNames.map((sport: string, i: number) => (
              <span
                key={i}
                className="text-xs font-medium px-3 py-1 rounded-full bg-[#B1BD93]/10 text-[#101B08] border border-[#B1BD93]/30"
              >
                {sport}
              </span>
            ))
          ) : (
            <span className="italic text-gray-400 text-xs">
              Aucun sport renseigné
            </span>
          )}
        </div>

        <div className="relative z-10 mt-4 text-sm text-gray-600 line-clamp-3">
          {sponsor.description || (
            <span className="italic text-gray-400">
              Aucune description renseignée
            </span>
          )}
        </div>

        {/* BADGE LEVEL */}
        {sponsor.level && (
          <div className="absolute bottom-0 left-0 w-full bg-[#101B08] text-white text-xs text-center py-1 tracking-wide font-semibold rounded-b-3xl z-20">
            {sponsor.level}
          </div>
        )}
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
                        onClick={async () => {
                          try {
                            const res = await trigger({
                              targetUserId: sponsor.id,
                              targetUserType: ProfileType.SPONSOR,
                              context: {
                                type: ConversationType.PRIVATE,
                                referenceId: undefined,
                              },
                            });
                            const conversationId = res?._id;
                            setAlertOpen(false);
                            setOpen(false);
                            if (conversationId) {
                              delay(() => {
                                router.push(
                                  ROUTES.MESSAGERIE.CONVERSATION(
                                    conversationId,
                                  ),
                                );
                              }, 100);
                            }
                          } catch (e) {
                            setAlertOpen(false);
                            setOpen(false);
                          }
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
                    className="bg-[#101B08] text-primary-green px-3 py-1 rounded-full font-semibold text-xs"
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
                Site Web
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
                    {/* {partnership.image && (
                      <img
                        src={partnership.image}
                        alt={partnership.name}
                        className="w-6 h-6 rounded-full object-cover"
                      />
                    )} */}
                    <span>{partnership}</span>
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

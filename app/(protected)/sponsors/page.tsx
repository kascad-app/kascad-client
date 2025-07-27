"use client";
import { useGetSponsors } from "@/entities/sponsors/sponsors.hooks";
import SponsorCard from "./SponsorCard";
import React, { useState } from "react";
import { MessageCircle } from "lucide-react";
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
import { ProfileType, ConversationType } from "@kascad-app/shared-types";
import { useGetOrCreateConversation } from "@/entities/direct-messages/conversations.hooks";

export default function SponsorsPage() {
  const { data: sponsors = [], isLoading, error } = useGetSponsors();
  const [openDialogSponsorId, setOpenDialogSponsorId] = useState<string | null>(
    null,
  );
  const { trigger } = useGetOrCreateConversation();

  // Calculs toujours après les hooks
  const now = new Date();
  const oneWeekAgo = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);
  const sortedByRecent = [...sponsors]
    .filter((sponsor: any) => sponsor.createdAt)
    .sort(
      (a: any, b: any) =>
        new Date(b.createdAt).getTime() - new Date(a.createdAt).getTime(),
    );
  const recentSponsors = sortedByRecent.filter(
    (sponsor: any) => new Date(sponsor.createdAt) >= oneWeekAgo,
  );
  const recentSlugsOrIds = new Set(
    recentSponsors.map((sponsor: any) => sponsor.slug || sponsor.id),
  );
  const originalSponsors = sponsors.filter(
    (sponsor: any) =>
      !recentSlugsOrIds.has(sponsor.slug) && !recentSlugsOrIds.has(sponsor.id),
  );
  const isEmpty = originalSponsors.length === 0;

  const handleStartConversation = (targetSponsorId: string) => {
    trigger({
      targetUserId: targetSponsorId,
      targetUserType: ProfileType.SPONSOR,
      context: {
        type: ConversationType.PRIVATE,
        referenceId: undefined,
      },
    });
    setOpenDialogSponsorId(null);
  };

  if (isLoading) {
    return (
      <div className="flex flex-col items-center justify-center min-h-[60vh] w-full">
        <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#d2fa52] mb-6"></div>
        <span className="text-lg text-[#101B08] font-bold font-figtree">
          Chargement de nos sponsors...
        </span>
      </div>
    );
  }

  if (error) {
    return (
      <p className="p-8 text-red-500">
        Erreur lors du chargement des sponsors.
      </p>
    );
  }

  return (
    <div className="w-full min-h-screen bg-white text-black px-4 sm:px-6 py-10">
      <h1 className="text-3xl font-bold mb-8">Nos sponsors</h1>
      {isEmpty ? (
        <div className="flex flex-col items-center justify-center py-24">
          <svg
            width="80"
            height="80"
            viewBox="0 0 80 80"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
            className="mb-6"
          >
            <circle
              cx="40"
              cy="40"
              r="38"
              stroke="#B1BD93"
              strokeWidth="4"
              fill="#F4F3EF"
            />
            <path
              d="M54 44c2.5-2.5 2.5-6.5 0-9l-2-2c-2.5-2.5-6.5-2.5-9 0l-2 2-2-2c-2.5-2.5-6.5-2.5-9 0l-2 2c-2.5 2.5-2.5 6.5 0 9l10 10c1.5 1.5 4 1.5 5.5 0l10-10z"
              stroke="#B1BD93"
              strokeWidth="3"
              fill="#B1BD93"
              fillOpacity="0.15"
            />
            <path
              d="M32 40l8 8"
              stroke="#B1BD93"
              strokeWidth="2"
              strokeLinecap="round"
            />
            <path
              d="M48 40l-8 8"
              stroke="#B1BD93"
              strokeWidth="2"
              strokeLinecap="round"
            />
          </svg>
          <h2 className="text-xl font-semibold mb-2 text-[#101B08]">
            Aucun sponsor pour le moment
          </h2>
          <p className="text-gray-500 mb-4 text-center max-w-md">
            Nous n'avons pas encore de sponsors à afficher. Revenez bientôt pour
            découvrir nos partenaires !
          </p>
        </div>
      ) : (
        <>
          {recentSponsors.length > 0 && (
            <div className="mb-10">
              <h2 className="text-2xl font-bold mb-4">
                Nous ont rejoint récemment
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {recentSponsors.map((sponsor: any) => (
                  <div className="relative" key={sponsor.id}>
                    <SponsorCard
                      key={sponsor.slug || sponsor.id}
                      sponsor={sponsor}
                    />
                    <AlertDialog
                      open={openDialogSponsorId === sponsor.id}
                      onOpenChange={(open) =>
                        setOpenDialogSponsorId(open ? sponsor.id : null)
                      }
                    >
                      <AlertDialogTrigger asChild>
                        <button
                          className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition"
                          aria-label="Contacter le sponsor"
                          type="button"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Démarrer une conversation ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Voulez-vous démarrer une conversation avec ce
                            sponsor ?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleStartConversation(sponsor.id)}
                          >
                            Démarrer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            </div>
          )}
          {originalSponsors.length > 0 && (
            <>
              <h2 className="text-2xl font-bold mb-4">
                Nous font confiance depuis longtemps
              </h2>
              <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
                {originalSponsors.map((sponsor: any) => (
                  <div className="relative" key={sponsor.id}>
                    <SponsorCard key={sponsor.id} sponsor={sponsor} />
                    <AlertDialog
                      open={openDialogSponsorId === sponsor.id}
                      onOpenChange={(open) =>
                        setOpenDialogSponsorId(open ? sponsor.id : null)
                      }
                    >
                      <AlertDialogTrigger asChild>
                        <button
                          className="absolute bottom-3 right-3 w-9 h-9 flex items-center justify-center bg-white border border-gray-300 rounded-lg shadow-sm hover:bg-gray-100 transition"
                          aria-label="Contacter le sponsor"
                          type="button"
                        >
                          <MessageCircle className="w-4 h-4" />
                        </button>
                      </AlertDialogTrigger>
                      <AlertDialogContent>
                        <AlertDialogHeader>
                          <AlertDialogTitle>
                            Démarrer une conversation ?
                          </AlertDialogTitle>
                          <AlertDialogDescription>
                            Voulez-vous démarrer une conversation avec ce
                            sponsor ?
                          </AlertDialogDescription>
                        </AlertDialogHeader>
                        <AlertDialogFooter>
                          <AlertDialogCancel>Annuler</AlertDialogCancel>
                          <AlertDialogAction
                            onClick={() => handleStartConversation(sponsor.id)}
                          >
                            Démarrer
                          </AlertDialogAction>
                        </AlertDialogFooter>
                      </AlertDialogContent>
                    </AlertDialog>
                  </div>
                ))}
              </div>
            </>
          )}
        </>
      )}
    </div>
  );
}

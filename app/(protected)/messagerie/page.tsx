"use client";

import {
  useGetConversations,
  useGetOrCreateConversation,
} from "@/entities/direct-messages/conversations.hooks";
import { Skeleton } from "@components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";
import { Card } from "@components/ui/card";
import { useEffect, useState } from "react";
import Link from "next/link";
import { Button } from "@components/ui/button";
import { ROUTES } from "@/shared/constants/ROUTES";
import { ConversationType } from "@kascad-app/shared-types";

export default function MessageriePage() {
  const [pagePrivate, setPagePrivate] = useState(1);
  const [pageJobOffer, setPageJobOffer] = useState(1);
  const PAGE_SIZE = 10;
  const {
    data: dataPrivate,
    isLoading: isLoadingPrivate,
    error: errorPrivate,
  } = useGetConversations({
    page: pagePrivate,
    limit: PAGE_SIZE,
    context: ConversationType.PRIVATE,
  });
  const {
    data: dataJobOffer,
    isLoading: isLoadingJobOffer,
    error: errorJobOffer,
  } = useGetConversations({
    page: pageJobOffer,
    limit: PAGE_SIZE,
    context: ConversationType.JOB_OFFER,
  });
  const privateConversations = dataPrivate?.conversations || [];
  const jobOfferConversations = dataJobOffer?.conversations || [];
  const paginationPrivate = dataPrivate?.pagination;
  const paginationJobOffer = dataJobOffer?.pagination;
  const totalPagesPrivate = paginationPrivate?.totalPages || 1;
  const totalPagesJobOffer = paginationJobOffer?.totalPages || 1;
  return (
    <div className="min-h-screen bg-white text-black p-8 flex flex-col">
      <h1 className="text-3xl font-bold mb-8">Messagerie</h1>
      <div className="flex-1 flex flex-col gap-12">
        {/* Section conversations privées */}
        <section>
          <h2 className="text-2xl font-bold mb-6">Conversations privées</h2>
          {isLoadingPrivate ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(PAGE_SIZE)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : errorPrivate ? (
            <div className="text-red-500 text-center py-12">
              Erreur lors du chargement des conversations.
            </div>
          ) : privateConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <span className="text-2xl font-bold text-gray-400 mb-4">
                Aucune conversation
              </span>
              <span className="text-gray-500 mb-6 text-center  max-w-md">
                Vous n'avez pas encore de messages. Pour démarrer une
                conversation avec un sponsor, parcourez la liste des sponsors
                existants et cliquez sur le profil du sponsor qui vous
                intéresse. Vous pourrez alors initier une discussion directement
                depuis sa fiche.
              </span>
              <div className="flex flex-col items-center gap-6 mt-6">
                <div className="text-center text-gray-600 text-lg max-w-md"></div>
                <Link href={ROUTES.SPONSORS.LIST}>
                  <Button className="bg-primary-green text-black font-semibold hover:bg-[#d9ff65] px-6 min-w-fit">
                    Voir nos sponsors
                  </Button>
                </Link>
              </div>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {privateConversations.map((conv) => (
                  <Card
                    key={conv._id}
                    className="p-6 flex flex-col gap-2 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {conv.otherParticipant.avatarUrl ? (
                        <img
                          src={conv.otherParticipant.avatarUrl}
                          alt={conv.otherParticipant.displayName || "Avatar"}
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-xl">
                          ?
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-lg text-[#101B08]">
                          {conv.otherParticipant.displayName ||
                            conv.otherParticipant.fullName ||
                            conv.otherParticipant.companyName ||
                            "Utilisateur"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {conv.otherParticipant.userType}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-700 mb-1">
                        {conv.lastMessage ? (
                          <>
                            <span className="font-semibold">
                              Dernier message :
                            </span>{" "}
                            {conv.lastMessage.content.length > 60
                              ? conv.lastMessage.content.slice(0, 60) + "..."
                              : conv.lastMessage.content}
                          </>
                        ) : (
                          <span className="italic text-gray-400">
                            Aucun message
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {conv.lastMessage
                          ? new Date(
                              conv.lastMessage.createdAt,
                            ).toLocaleString()
                          : ""}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              {/* Pagination privée */}
              {privateConversations.length > 0 && (
                <div className="w-full flex justify-center bg-white py-6 border-t border-gray-200">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            if (pagePrivate > 1)
                              setPagePrivate(pagePrivate - 1);
                          }}
                          className={
                            pagePrivate === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                      {[...Array(totalPagesPrivate)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            isActive={pagePrivate === i + 1}
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              setPagePrivate(i + 1);
                            }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            if (pagePrivate < totalPagesPrivate)
                              setPagePrivate(pagePrivate + 1);
                          }}
                          className={
                            pagePrivate === totalPagesPrivate
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </section>
        {/* Section conversations job-offer */}
        <section>
          <h2 className="text-2xl font-bold mb-6">
            Conversations liées à une candidature
          </h2>
          {isLoadingJobOffer ? (
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
              {[...Array(PAGE_SIZE)].map((_, i) => (
                <Skeleton key={i} className="h-32 w-full rounded-xl" />
              ))}
            </div>
          ) : errorJobOffer ? (
            <div className="text-red-500 text-center py-12">
              Erreur lors du chargement des conversations.
            </div>
          ) : jobOfferConversations.length === 0 ? (
            <div className="flex flex-col items-center justify-center py-24">
              <span className="text-2xl font-bold text-gray-400 mb-4">
                Aucune conversation liée à une candidature
              </span>
              <span className="text-gray-500 mb-6 text-center max-w-md">
                Vous n'avez pas encore de messages liés à une offre d'emploi ou
                une candidature.
              </span>
            </div>
          ) : (
            <>
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
                {jobOfferConversations.map((conv) => (
                  <Card
                    key={conv._id}
                    className="p-6 flex flex-col gap-2 hover:shadow-lg transition-shadow cursor-pointer"
                  >
                    <div className="flex items-center gap-3 mb-2">
                      {conv.otherParticipant.avatarUrl ? (
                        <img
                          src={conv.otherParticipant.avatarUrl}
                          alt={conv.otherParticipant.displayName || "Avatar"}
                          className="w-12 h-12 rounded-full object-cover border"
                        />
                      ) : (
                        <div className="w-12 h-12 rounded-full bg-gray-200 flex items-center justify-center text-gray-400 font-bold text-xl">
                          ?
                        </div>
                      )}
                      <div>
                        <div className="font-bold text-lg text-[#101B08]">
                          {conv.otherParticipant.displayName ||
                            conv.otherParticipant.fullName ||
                            conv.otherParticipant.companyName ||
                            "Utilisateur"}
                        </div>
                        <div className="text-xs text-gray-500">
                          {conv.otherParticipant.userType}
                        </div>
                      </div>
                    </div>
                    <div className="flex-1">
                      <div className="text-sm text-gray-700 mb-1">
                        {conv.lastMessage ? (
                          <>
                            <span className="font-semibold">
                              Dernier message :
                            </span>{" "}
                            {conv.lastMessage.content.length > 60
                              ? conv.lastMessage.content.slice(0, 60) + "..."
                              : conv.lastMessage.content}
                          </>
                        ) : (
                          <span className="italic text-gray-400">
                            Aucun message
                          </span>
                        )}
                      </div>
                      <div className="text-xs text-gray-400">
                        {conv.lastMessage
                          ? new Date(
                              conv.lastMessage.createdAt,
                            ).toLocaleString()
                          : ""}
                      </div>
                    </div>
                  </Card>
                ))}
              </div>
              {/* Pagination job-offer */}
              {jobOfferConversations.length > 0 && (
                <div className="w-full flex justify-center bg-white py-6 border-t border-gray-200">
                  <Pagination>
                    <PaginationContent>
                      <PaginationItem>
                        <PaginationPrevious
                          href="#"
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            if (pageJobOffer > 1)
                              setPageJobOffer(pageJobOffer - 1);
                          }}
                          className={
                            pageJobOffer === 1
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                      {[...Array(totalPagesJobOffer)].map((_, i) => (
                        <PaginationItem key={i}>
                          <PaginationLink
                            href="#"
                            isActive={pageJobOffer === i + 1}
                            onClick={(e: React.MouseEvent) => {
                              e.preventDefault();
                              setPageJobOffer(i + 1);
                            }}
                          >
                            {i + 1}
                          </PaginationLink>
                        </PaginationItem>
                      ))}
                      <PaginationItem>
                        <PaginationNext
                          href="#"
                          onClick={(e: React.MouseEvent) => {
                            e.preventDefault();
                            if (pageJobOffer < totalPagesJobOffer)
                              setPageJobOffer(pageJobOffer + 1);
                          }}
                          className={
                            pageJobOffer === totalPagesJobOffer
                              ? "pointer-events-none opacity-50"
                              : ""
                          }
                        />
                      </PaginationItem>
                    </PaginationContent>
                  </Pagination>
                </div>
              )}
            </>
          )}
        </section>
      </div>
    </div>
  );
}

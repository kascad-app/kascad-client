"use client";

import { useState } from "react";
import { useGetOffers } from "@/entities/offers/offers.hook";
import { IOffer } from "@kascad-app/shared-types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Badge } from "@/components/ui/badge";

const PAGE_SIZE = 10;

export default function OffresPage() {
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetOffers({ page, limit: PAGE_SIZE });
  // Adaptation au nouveau type IOfferPaginee
  const offersArray: IOffer[] = Array.isArray(data?.offers) ? data.offers : [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;

  return (
    <main className="min-h-screen bg-white text-black p-8">
      <h1 className="text-2xl font-bold mb-8">Offres disponibles</h1>
      {isLoading ? (
        <p>Chargement des offres...</p>
      ) : error ? (
        <p className="text-red-500">Erreur lors du chargement des offres.</p>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {offersArray.length === 0 ? (
              <div className="col-span-3 text-center text-gray-500 py-12">
                Aucune offre disponible pour le moment.
              </div>
            ) : (
              offersArray.map((offer: IOffer) => (
                <div
                  key={offer._id}
                  className="bg-white border border-gray-200 rounded-xl shadow-sm p-6 flex flex-col gap-4 hover:shadow-md transition-all"
                >
                  <h2 className="text-lg font-bold text-[#3f4139] mb-2">
                    {offer.title}
                  </h2>
                  <div className="flex flex-wrap gap-2 mb-2">
                    {offer.sports.map((sport: string) => (
                      <Badge
                        key={sport}
                        variant="secondary"
                        className="text-xs px-2 py-1"
                      >
                        {sport}
                      </Badge>
                    ))}
                  </div>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Type :</span>{" "}
                    {offer.contractType}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Statut :</span>{" "}
                    {offer.status}
                  </p>
                  <p className="text-sm text-gray-600 mb-1">
                    <span className="font-semibold">Budget :</span>{" "}
                    {offer.budgetMin ? offer.budgetMin : "-"}{" "}
                    {offer.currency || ""}
                    {offer.budgetMax
                      ? ` - ${offer.budgetMax} ${offer.currency || ""}`
                      : ""}
                  </p>
                  <p className="text-sm text-gray-700 mt-2 line-clamp-3">
                    {offer.description}
                  </p>
                  <p className="text-xs text-gray-400 mt-2">
                    Publiée le {new Date(offer.createdAt).toLocaleDateString()}
                  </p>
                </div>
              ))
            )}
          </div>
          <div className="flex justify-center mt-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page > 1) setPage(page - 1);
                    }}
                    className={
                      page === 1 ? "pointer-events-none opacity-50" : ""
                    }
                  />
                </PaginationItem>
                {[...Array(totalPages)].map((_, i) => (
                  <PaginationItem key={i}>
                    <PaginationLink
                      href="#"
                      isActive={page === i + 1}
                      onClick={(e) => {
                        e.preventDefault();
                        setPage(i + 1);
                      }}
                    >
                      {i + 1}
                    </PaginationLink>
                  </PaginationItem>
                ))}
                {totalPages > 5 && page < totalPages - 2 && (
                  <PaginationItem>
                    <PaginationEllipsis />
                  </PaginationItem>
                )}
                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault();
                      if (page < totalPages) setPage(page + 1);
                    }}
                    className={
                      page === totalPages
                        ? "pointer-events-none opacity-50"
                        : ""
                    }
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        </>
      )}
    </main>
  );
}

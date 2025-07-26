import { IOffer, IOffersRider } from "@kascad-app/shared-types";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMyOffers, IMyOffersPaginee } from "@/entities/offers/offer.type";
import { useState } from "react";
import { useGetMyOffers } from "@/entities/offers/offers.hook";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

export default function MyOffers() {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 20;
  const result = useGetMyOffers({
    page,
    limit: PAGE_SIZE,
  });
  const data = result.data;
  const isLoading = result.isLoading;
  const error = result.error;
  const offersArray: IMyOffers[] = Array.isArray(data?.applications)
    ? data.applications
    : [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;
  console.log(offersArray);
  return (
    <div>
      <div className="flex items-center justify-between mb-8">
        <h1 className="text-2xl font-bold">Mes Offres</h1>
        {typeof pagination?.totalItems === "number" && (
          <div className="text-sm text-[#7a7a7a] font-medium">
            {pagination.totalItems} offre{pagination.totalItems > 1 ? "s" : ""}{" "}
            candidatée{pagination.totalItems > 1 ? "s" : ""}
          </div>
        )}
      </div>
      {isLoading ? (
        <div className="flex flex-col items-center justify-center h-64 w-full">
          <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#d2fa52] mb-6"></div>
          <span className="text-lg text-[#101B08] font-bold font-figtree">
            Chargement de vos offres...
          </span>
        </div>
      ) : error ? (
        <p className="text-red-500">Erreur lors du chargement de vos offres.</p>
      ) : offersArray.length === 0 ? (
        <div className="text-center text-gray-500 py-12">
          Aucune offre trouvée.
        </div>
      ) : (
        <>
          <Table className="rounded-xl overflow-hidden shadow-lg border border-[#eaf7c2]">
            <TableHeader className="bg-[#f6ffe0]">
              <TableRow>
                <TableHead>Titre</TableHead>
                <TableHead>Contrat</TableHead>
                <TableHead>Statut</TableHead>
                <TableHead>Budget</TableHead>
                <TableHead>Date</TableHead>
                <TableHead>Sponsor</TableHead>
                <TableHead className="bg-[#f6ffe0]">Actions</TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {offersArray.map((myOffer) => (
                <TableRow
                  key={myOffer.offer._id}
                  className="hover:bg-[#eaf7c2]/40"
                >
                  <TableCell className="font-bold text-[#101B08]">
                    {myOffer.offer.title}
                  </TableCell>
                  <TableCell>
                    {myOffer.offer.contractType || (
                      <span className="italic text-gray-400">
                        Non renseigné
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {myOffer.application ? (
                      <Badge
                        className={
                          myOffer.application === "accepted"
                            ? "bg-green-100 text-green-800 border-green-300"
                            : myOffer.application === "pending"
                            ? "bg-yellow-100 text-yellow-800 border-yellow-300"
                            : myOffer.application === "rejected"
                            ? "bg-red-100 text-red-800 border-red-300"
                            : "bg-gray-100 text-gray-600 border-gray-300"
                        }
                        variant="outline"
                      >
                        {myOffer.application === "accepted"
                          ? "Acceptée"
                          : myOffer.application === "pending"
                          ? "En attente"
                          : myOffer.application === "rejected"
                          ? "Refusée"
                          : myOffer.application}
                      </Badge>
                    ) : (
                      <span className="italic text-gray-400">
                        Non renseigné
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {myOffer.offer.budgetMin || myOffer.offer.budgetMax ? (
                      <>
                        {myOffer.offer.budgetMin
                          ? myOffer.offer.budgetMin
                          : "-"}{" "}
                        {myOffer.offer.currency || ""}
                        {myOffer.offer.budgetMax
                          ? ` - ${myOffer.offer.budgetMax} ${
                              myOffer.offer.currency || ""
                            }`
                          : ""}
                      </>
                    ) : (
                      <span className="italic text-gray-400">
                        Non renseigné
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {myOffer.offer.createdAt ? (
                      new Date(myOffer.offer.createdAt).toLocaleDateString()
                    ) : (
                      <span className="italic text-gray-400">
                        Date inconnue
                      </span>
                    )}
                  </TableCell>
                  <TableCell>
                    {myOffer.offer.sponsor &&
                    myOffer.offer.sponsor.companyName ? (
                      <span className="font-bold text-[#101B08]">
                        {myOffer.offer.sponsor.companyName}
                      </span>
                    ) : (
                      <span className="italic text-gray-400">
                        Non renseigné
                      </span>
                    )}
                  </TableCell>
                  <TableCell className="text-right p-0 w-0 whitespace-nowrap align-middle">
                    <button className="inline-flex items-center gap-2 px-3 py-1 bg-[#f6ffe0] text-[#3f4139] font-medium text-xs border border-[#eaf7c2] rounded-md shadow-none transition-all duration-200 hover:bg-[#eaf7c2] hover:text-[#101B08] hover:border-[#d2fa52] active:scale-95 focus:outline-none focus:ring-1 focus:ring-[#eaf7c2] focus:ring-offset-1">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        strokeWidth={1.5}
                        stroke="currentColor"
                        className="w-4 h-4"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21.75 6.75v7.5a2.25 2.25 0 01-2.25 2.25h-5.25l-4.5 3v-3H4.5A2.25 2.25 0 012.25 14.25v-7.5A2.25 2.25 0 014.5 4.5h15a2.25 2.25 0 012.25 2.25z"
                        />
                      </svg>
                      Accéder à la conversation
                    </button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
          {/* Pagination below table */}
          <div className="w-full flex justify-center py-6">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e: React.MouseEvent) => {
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
                      onClick={(e: React.MouseEvent) => {
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
                    onClick={(e: React.MouseEvent) => {
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
    </div>
  );
}

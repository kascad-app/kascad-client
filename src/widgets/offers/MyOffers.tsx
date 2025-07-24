import { IOffer, IOffersRider } from "@kascad-app/shared-types";
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
  const PAGE_SIZE = 9;
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
      <h1 className="text-2xl font-bold mb-8">Mes Offres</h1>
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
                <TableHead>Sports</TableHead>
                <TableHead>Sponsor</TableHead>
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
                    {myOffer.application || (
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
                    {myOffer.offer.sports && myOffer.offer.sports.length > 0 ? (
                      <div className="flex flex-wrap gap-1">
                        {myOffer.offer.sports.map((sport) => (
                          <span
                            key={sport}
                            className="bg-[#f6ffe0] text-[#7a7a7a] px-2 py-0.5 rounded-lg border border-[#eaf7c2] text-xs font-medium tracking-wide shadow-none whitespace-nowrap"
                          >
                            {sport}
                          </span>
                        ))}
                      </div>
                    ) : (
                      <span className="italic text-gray-400">Aucun</span>
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

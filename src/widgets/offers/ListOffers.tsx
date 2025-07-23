import { useEffect, useState } from "react";
import {
  useGetOffers,
  usePostCustomRiderOffer,
} from "@/entities/offers/offers.hook";
import { toast } from "sonner";
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

const PAGE_SIZE = 9;

export default function ListOffers() {
  const handlePostuler = async (offerId: string) => {
    toast.success(`Postulation pour l'offre ${offerId} en cours...`);
    try {
      await postOfferMutation.trigger({ id: offerId });
    } catch (error) {
      console.log(`Postuler pour l'offre avec l'ID: ${error}`);
      toast.error(
        `Erreur lors de la candidature pour l'offre ${offerId}: ${error}`,
      );
    }
  };
  const [page, setPage] = useState(1);
  const { data, isLoading, error } = useGetOffers({ page, limit: PAGE_SIZE });
  const offersArray: IOffer[] = Array.isArray(data?.data) ? data?.data : [];
  const postOfferMutation = usePostCustomRiderOffer();
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="flex-1 flex flex-col relative">
      <h1 className="text-2xl font-bold mb-8">Offres disponibles</h1>
      <div className="flex-1">
        {isLoading ? (
          <p>Chargement des offres...</p>
        ) : error ? (
          <p className="text-red-500">Erreur lors du chargement des offres.</p>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8 mb-8">
            {offersArray.length === 0 && (
              <div className="col-span-3 text-center text-gray-500 py-12">
                Aucune offre disponible pour le moment.
              </div>
            )}
            {offersArray.length > 0 &&
              offersArray.map((offer: IOffer) => (
                <div
                  key={offer._id}
                  className="relative bg-white border-2 border-[#eaf7c2] rounded-2xl shadow-lg p-6 flex flex-col gap-4 transition-all duration-300 group overflow-hidden hover:-translate-y-2 hover:shadow-[0_8px_32px_0_rgba(210,250,82,0.25)] hover:border-[#d2fa52]"
                >
                  <div className="absolute top-0 right-0 m-4 flex gap-2 z-10">
                    {offer.sports.map((sport: string) => (
                      <span
                        key={sport}
                        className="bg-[#f6ffe0] text-[#3f4139] px-4 py-1 rounded-full border border-[#d2fa52] text-xs font-bold uppercase tracking-wide shadow-sm transition-all duration-200 "
                      >
                        {sport}
                      </span>
                    ))}
                  </div>
                  <h2 className="text-2xl font-extrabold text-[#101B08] mb-2 font-michroma drop-shadow-lg">
                    {offer.title}
                  </h2>
                  <div className="flex flex-wrap gap-3 mb-2">
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-[#f6ffe0] text-[#3f4139] px-3 py-0.5 rounded-lg border border-[#eaf7c2]">
                      Contrat :{" "}
                      <span className="font-semibold">
                        {offer.contractType}
                      </span>
                    </span>
                    <span className="inline-flex items-center gap-1 text-xs font-medium bg-[#eaf7c2] text-[#3f4139] px-3 py-0.5 rounded-lg border border-[#d2fa52]">
                      Statut :{" "}
                      <span className="font-semibold">{offer.status}</span>
                    </span>
                  </div>
                  <div className="flex items-center gap-2 mb-2">
                    <span className="font-bold text-[#3f4139] text-sm border-b-2 border-[#d2fa52] pb-0.5">
                      Budget :
                    </span>
                    <span className="text-sm text-[#3f4139] px-3 py-1 border border-[#d2fa52] rounded-lg bg-[#f6ffe0] font-semibold">
                      {offer.budgetMin ? offer.budgetMin : "-"}{" "}
                      {offer.currency || ""}
                      {offer.budgetMax
                        ? ` - ${offer.budgetMax} ${offer.currency || ""}`
                        : ""}
                    </span>
                  </div>
                  <p className="text-base text-[#101B08] font-figtree mt-2 line-clamp-3">
                    {offer.description}
                  </p>
                  <div className="flex items-center justify-between mt-4">
                    <span className="text-xs text-[#7a7a7a] font-normal">
                      Publiée le{" "}
                      {new Date(offer.createdAt).toLocaleDateString()}
                    </span>
                    <button
                      onClick={() => handlePostuler(offer._id)}
                      className="px-6 py-2 bg-[#eaf7c2] text-[#3f4139] font-bold text-xs border border-[#b6d94c] rounded-lg shadow-sm transition-all duration-200 hover:bg-[#d2fa52] hover:text-[#101B08] hover:border-[#d2fa52] active:scale-95"
                    >
                      Postuler
                    </button>
                  </div>
                  <div className="absolute left-0 bottom-0 w-full h-2 bg-[#eaf7c2] opacity-70 rounded-b-2xl group-hover:bg-[#d2fa52] group-hover:opacity-80 transition-all duration-300" />
                  <div className="absolute right-0 top-0 w-10 h-10 bg-[#d2fa52] rounded-bl-2xl blur-md opacity-20" />
                </div>
              ))}
          </div>
        )}
      </div>
      <div className="w-full flex justify-center fixed left-0 bottom-0 bg-white py-6 z-20 border-t border-gray-200">
        <Pagination>
          <PaginationContent>
            <PaginationItem>
              <PaginationPrevious
                href="#"
                onClick={(e: React.MouseEvent) => {
                  e.preventDefault();
                  if (page > 1) setPage(page - 1);
                }}
                className={page === 1 ? "pointer-events-none opacity-50" : ""}
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
                  page === totalPages ? "pointer-events-none opacity-50" : ""
                }
              />
            </PaginationItem>
          </PaginationContent>
        </Pagination>
      </div>
    </div>
  );
}

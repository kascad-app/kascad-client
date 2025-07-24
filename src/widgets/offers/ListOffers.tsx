import { usePostCustomRiderOffer } from "@/entities/offers/offers.hook";
import { toast } from "sonner";
import { IOffersRider } from "@kascad-app/shared-types";
import {
  Pagination,
  PaginationContent,
  PaginationEllipsis,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

import { useGetOffers } from "@/entities/offers/offers.hook";
import { useState } from "react";

export default function ListOffers() {
  const [page, setPage] = useState(1);
  const PAGE_SIZE = 9;
  const { data, isLoading, error } = useGetOffers({
    page,
    limit: PAGE_SIZE,
  });
  const postOfferMutation = usePostCustomRiderOffer();
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
  const offersArray: IOffersRider[] = Array.isArray(data?.data)
    ? data?.data
    : [];
  const pagination = data?.pagination;
  const totalPages = pagination?.totalPages || 1;

  return (
    <div className="flex-1 flex flex-col relative">
      <h1 className="text-2xl font-bold mb-8">Offres disponibles</h1>
      <div className="flex-1 mb-10">
        {isLoading ? (
          <div className="flex flex-col items-center justify-center h-64 w-full">
            <div className="animate-spin rounded-full h-16 w-16 border-t-4 border-b-4 border-[#d2fa52] mb-6"></div>
            <span className="text-lg text-[#101B08] font-bold font-figtree">
              Chargement des offres...
            </span>
          </div>
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
              offersArray.map((offer: IOffersRider) => (
                <div
                  key={offer._id}
                  className="relative bg-white border-2 border-[#eaf7c2] rounded-2xl shadow-lg p-6 flex flex-col transition-all  gap-2  duration-300 group overflow-hidden hover:-translate-y-2 hover:shadow-[0_8px_32px_0_rgba(210,250,82,0.25)] hover:border-[#d2fa52] h-full"
                >
                  <h2 className="text-2xl font-extrabold text-[#101B08] mb-1 font-michroma drop-shadow-lg">
                    {offer.title}
                  </h2>
                  {/* Sports badges below title, horizontal scroll if overflow */}
                  <div className="w-full overflow-x-auto scrollbar-thin scrollbar-thumb-[#eaf7c2] scrollbar-track-transparent">
                    <div className="flex gap-1 min-w-max">
                      {offer.sports.map((sport: string) => (
                        <span
                          key={sport}
                          className="bg-[#f6ffe0] text-[#7a7a7a] px-2 py-0.5 rounded-lg border border-[#eaf7c2] text-xs font-medium tracking-wide shadow-none whitespace-nowrap"
                        >
                          {sport}
                        </span>
                      ))}
                    </div>
                  </div>
                  <div className="flex flex-col flex-grow">
                    {/* Infos principales */}
                    <div>
                      <div className="flex flex-wrap gap-3 mb-2">
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-[#f6ffe0] text-[#3f4139] px-3 py-0.5 rounded-lg border border-[#eaf7c2]">
                          Contrat :{" "}
                          <span className="font-semibold">
                            {offer.contractType ? (
                              offer.contractType
                            ) : (
                              <span className="italic text-gray-400">
                                Non renseigné
                              </span>
                            )}
                          </span>
                        </span>
                        <span className="inline-flex items-center gap-1 text-xs font-medium bg-[#eaf7c2] text-[#3f4139] px-3 py-0.5 rounded-lg border border-[#d2fa52]">
                          Statut :{" "}
                          <span className="font-semibold">
                            {offer.status ? (
                              offer.status
                            ) : (
                              <span className="italic text-gray-400">
                                Non renseigné
                              </span>
                            )}
                          </span>
                        </span>
                      </div>
                      <div className="flex items-center gap-2 mb-4">
                        <span className="font-bold text-[#3f4139] text-sm border-b-2 border-[#d2fa52] pb-0.5">
                          Budget :
                        </span>
                        <span className="text-sm text-[#3f4139] px-3 py-1 border border-[#d2fa52] rounded-lg bg-[#f6ffe0] font-semibold">
                          {offer.budgetMin || offer.budgetMax ? (
                            <>
                              {offer.budgetMin ? offer.budgetMin : "-"}{" "}
                              {offer.currency || ""}
                              {offer.budgetMax
                                ? ` - ${offer.budgetMax} ${
                                    offer.currency || ""
                                  }`
                                : ""}
                            </>
                          ) : (
                            <span className="italic text-gray-400">
                              Non renseigné
                            </span>
                          )}
                        </span>
                      </div>
                      <p
                        className={`font-figtree mt-2 break-words ${
                          offer.description && offer.description.length > 200
                            ? "text-sm"
                            : "text-base"
                        } text-[#101B08]`}
                      >
                        {offer.description &&
                        offer.description.trim() !== "" ? (
                          offer.description
                        ) : (
                          <span className="italic text-gray-400">
                            Aucune description fournie
                          </span>
                        )}
                      </p>
                      {/* Bouton Postuler sous la description */}
                    </div>
                    {/* Footer toujours en bas */}
                    <div className=" flex-1 flex flex-col justify-end">
                      <div className="flex items-center justify-end mt-4">
                        <button
                          onClick={() => handlePostuler(offer._id)}
                          disabled={
                            postOfferMutation.isMutating || offer.alreadyApplied
                          }
                          className={`px-6 py-2 font-bold text-xs border rounded-lg shadow-sm transition-all duration-200 active:scale-95
                            ${
                              postOfferMutation.isMutating ||
                              offer.alreadyApplied
                                ? "bg-gray-200 text-gray-400 border-gray-300 cursor-not-allowed opacity-60"
                                : "bg-[#eaf7c2] text-[#3f4139] border-[#b6d94c] hover:bg-[#d2fa52] hover:text-[#101B08] hover:border-[#d2fa52]"
                            }
                          `}
                        >
                          {offer.alreadyApplied ? "Déjà postulé" : "Postuler"}
                        </button>
                      </div>
                      <div className="mt-2 border-t pt-2 border-[#eaf7c2] flex items-center justify-between">
                        {/* Sponsor à gauche */}
                        {offer.sponsor && offer.sponsor.companyName ? (
                          <div className="flex items-center gap-2">
                            <span className="text-[#7a7a7a] text-xs italic">
                              Sponsor :
                            </span>
                            <span className="text-[#101B08] text-xs font-bold font-figtree">
                              {offer.sponsor.companyName}
                            </span>
                          </div>
                        ) : (
                          <span className="italic text-gray-400 text-xs">
                            Sponsor non renseigné
                          </span>
                        )}
                        {/* Date à droite */}
                        <span className="text-xs text-[#7a7a7a] font-normal">
                          Publiée le{" "}
                          {offer.createdAt ? (
                            new Date(offer.createdAt).toLocaleDateString()
                          ) : (
                            <span className="italic text-gray-400">
                              Date inconnue
                            </span>
                          )}
                        </span>
                      </div>
                    </div>
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

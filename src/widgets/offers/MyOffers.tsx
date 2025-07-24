import { IOffer } from "@kascad-app/shared-types";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { IMyOffersPaginee } from "@/entities/offers/offer.type";

interface MyOffersProps {
  data: IMyOffersPaginee | undefined;
  isLoading: boolean;
  error: any;
  page: number;
  setPage: (page: number) => void;
  pageSize: number;
}
export default function MyOffers({
  data,
  isLoading,
  error,
  page,
  setPage,
  pageSize,
}: MyOffersProps) {
  // On suppose que data est un tableau d'offres
  const offersArray: IOffer[] = Array.isArray(data) ? data : [];

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
        <Table className="rounded-xl overflow-hidden shadow-lg border border-[#eaf7c2]">
          <TableHeader className="bg-[#f6ffe0]">
            <TableRow>
              <TableHead>Titre</TableHead>
              <TableHead>Contrat</TableHead>
              <TableHead>Statut</TableHead>
              <TableHead>Budget</TableHead>
              <TableHead>Date</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {offersArray.map((offer) => (
              <TableRow key={offer._id} className="hover:bg-[#eaf7c2]/40">
                <TableCell className="font-bold text-[#101B08]">
                  {offer.title}
                </TableCell>
                <TableCell>
                  {offer.contractType || (
                    <span className="italic text-gray-400">Non renseigné</span>
                  )}
                </TableCell>
                <TableCell>
                  {offer.status || (
                    <span className="italic text-gray-400">Non renseigné</span>
                  )}
                </TableCell>
                <TableCell>
                  {offer.budgetMin || offer.budgetMax ? (
                    <>
                      {offer.budgetMin ? offer.budgetMin : "-"}{" "}
                      {offer.currency || ""}
                      {offer.budgetMax
                        ? ` - ${offer.budgetMax} ${offer.currency || ""}`
                        : ""}
                    </>
                  ) : (
                    <span className="italic text-gray-400">Non renseigné</span>
                  )}
                </TableCell>
                <TableCell>
                  {offer.createdAt ? (
                    new Date(offer.createdAt).toLocaleDateString()
                  ) : (
                    <span className="italic text-gray-400">Date inconnue</span>
                  )}
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      )}
    </div>
  );
}

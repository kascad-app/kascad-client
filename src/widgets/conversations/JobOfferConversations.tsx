import { Card } from "@components/ui/card";
import { Skeleton } from "@components/ui/skeleton";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@components/ui/pagination";
import { useRouter } from "next/navigation";
import { ROUTES } from "@/shared/constants/ROUTES";

export default function JobOfferConversations({
  conversations,
  isLoading,
  error,
  page,
  setPage,
  totalPages,
}: {
  conversations: any[];
  isLoading: boolean;
  error: any;
  page: number;
  setPage: (page: number) => void;
  totalPages: number;
}) {
  const PAGE_SIZE = 10;
  const router = useRouter();
  return (
    <section>
      <h2 className="text-2xl font-bold mb-6">
        Conversations liées à une candidature
      </h2>
      {isLoading ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {[...Array(PAGE_SIZE)].map((_, i) => (
            <Skeleton key={i} className="h-32 w-full rounded-xl" />
          ))}
        </div>
      ) : error ? (
        <div className="text-red-500 text-center py-12">
          Erreur lors du chargement des conversations.
        </div>
      ) : conversations.length === 0 ? (
        <div className="flex flex-col items-center justify-center py-24">
          <span className="text-2xl font-bold text-gray-400 mb-4">
            Aucune conversation liée à une candidature
          </span>
          <span className="text-gray-500 mb-6 text-center max-w-md">
            Vous n'avez pas encore de messages liés à une offre d'emploi.
            Attendez d'avoir été sélectionné pour démarrer une conversation avec
            le recruteur.
          </span>
        </div>
      ) : (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 mb-8">
            {conversations.map((conv) => (
              <Card
                key={conv._id}
                className="p-6 flex flex-col gap-2 hover:shadow-lg transition-shadow cursor-pointer"
                onClick={() =>
                  router.push(ROUTES.MESSAGERIE.CONVERSATION(conv._id))
                }
              >
                <div className="flex items-center gap-3 mb-2">
                  {conv.otherParticipant.avatarUrl ? (
                    <img
                      src={conv.otherParticipant.avatarUrl}
                      alt={conv.otherParticipant.companyName || "Avatar"}
                      className="w-14 h-14 object-contain rounded-xl bg-gray-50"
                    />
                  ) : (
                    <img
                      src="/favicon.ico"
                      alt="Pas d'avatar"
                      className="w-14 h-14 object-contain opacity-15 grayscale rounded-xl bg-gray-50"
                    />
                  )}
                  <div>
                    <div className="font-bold text-lg text-[#101B08]">
                      {conv.otherParticipant.companyName || "Utilisateur"}
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
                        <span className="font-semibold">Dernier message :</span>{" "}
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
                      ? new Date(conv.lastMessage.createdAt).toLocaleString()
                      : ""}
                  </div>
                </div>
              </Card>
            ))}
          </div>
          {conversations.length > 0 && (
            <div className="w-full flex justify-center bg-white py-6 border-t border-gray-200">
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
          )}
        </>
      )}
    </section>
  );
}

"use client";

import {
  useGetConversations
} from "@/entities/direct-messages/conversations.hooks";
import JobOfferConversations from "@/widgets/conversations/JobOfferConversations";
import PrivateConversations from "@/widgets/conversations/PrivateConversations";
import { ConversationType } from "@kascad-app/shared-types";
import { useState } from "react";

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
        <PrivateConversations
          conversations={privateConversations}
          isLoading={isLoadingPrivate}
          error={errorPrivate}
          page={pagePrivate}
          setPage={setPagePrivate}
          totalPages={totalPagesPrivate}
        />
        <JobOfferConversations
          conversations={jobOfferConversations}
          isLoading={isLoadingJobOffer}
          error={errorJobOffer}
          page={pageJobOffer}
          setPage={setPageJobOffer}
          totalPages={totalPagesJobOffer}
        />
      </div>
    </div>
  );
}

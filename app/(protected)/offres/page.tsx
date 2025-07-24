"use client";

import { useState } from "react";
import ListOffers from "@/widgets/offers/ListOffers";
import { useGetMyOffers, useGetOffers } from "@/entities/offers/offers.hook";
import MyOffers from "@/widgets/offers/MyOffers";

export default function OffresPage() {
  const [activeTab, setActiveTab] = useState<"candidatures" | "offres">(
    "offres",
  );

  // Pagination state
  const [pageListOffers, setPageListOffers] = useState(1);
  const [pageMyOffers, setPageMyOffers] = useState(1);
  const PAGE_SIZE_LIST_OFFERS = 9;
  const PAGE_SIZE_MY_OFFERS = 9;
  const {
    data: dataListOffers,
    isLoading: isLoadingListOffers,
    error: errorListOffers,
  } = useGetOffers({
    page: pageListOffers,
    limit: PAGE_SIZE_LIST_OFFERS,
  });
  const {
    data: dataMyOffers,
    isLoading: isLoadingMyOffers,
    error: errorMyOffers,
  } = useGetMyOffers({
    page: pageMyOffers,
    limit: PAGE_SIZE_MY_OFFERS,
  });

  return (
    <div className="min-h-screen bg-white text-black p-8 flex flex-col">
      <div className="mb-8 relative w-full max-w-xl mx-auto">
        <div className="flex gap-0 bg-gray-100 rounded-lg overflow-hidden relative">
          <button
            className={`flex-1 px-6 py-3 font-bold text-lg focus:outline-none transition-all duration-300 ${
              activeTab === "candidatures" ? "text-[#101B08]" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("candidatures")}
            style={{ position: "relative", zIndex: 2 }}
          >
            Mes Candidatures
          </button>
          <button
            className={`flex-1 px-6 py-3 font-bold text-lg focus:outline-none transition-all duration-300 ${
              activeTab === "offres" ? "text-[#101B08]" : "text-gray-500"
            }`}
            onClick={() => setActiveTab("offres")}
            style={{ position: "relative", zIndex: 2 }}
          >
            Les dernières offres
          </button>
          {/* Animated indicator */}
          <span
            className="absolute bottom-0 left-0 h-1 rounded-lg bg-[#d2fa52] transition-all duration-300"
            style={{
              width: "50%",
              transform:
                activeTab === "candidatures"
                  ? "translateX(0%)"
                  : "translateX(100%)",
            }}
          />
        </div>
      </div>
      <div className="flex-1">
        {activeTab === "candidatures" ? (
          <MyOffers
            data={dataMyOffers}
            isLoading={isLoadingMyOffers}
            error={errorMyOffers}
            page={pageMyOffers}
            setPage={setPageMyOffers}
            pageSize={PAGE_SIZE_MY_OFFERS}
          />
        ) : (
          <ListOffers
            data={dataListOffers}
            isLoading={isLoadingListOffers}
            error={errorListOffers}
            page={pageListOffers}
            setPage={setPageListOffers}
            pageSize={PAGE_SIZE_LIST_OFFERS}
          />
        )}
      </div>
    </div>
  );
}

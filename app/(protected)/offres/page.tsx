"use client";

import { use, useEffect, useState } from "react";
import {
  useGetOffers,
  usePostCustomRiderOffer,
} from "@/entities/offers/offers.hook";
import { IOffer } from "@kascad-app/shared-types";
import ListOffers from "@/widgets/offers/ListOffers";
import { toast } from "sonner";
import MyOffers from "@/widgets/offers/MyOffers";

export default function OffresPage() {
  const [activeTab, setActiveTab] = useState<"candidatures" | "offres">(
    "candidatures",
  );

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
        {activeTab === "candidatures" ? <MyOffers /> : <ListOffers />}
      </div>
    </div>
  );
}

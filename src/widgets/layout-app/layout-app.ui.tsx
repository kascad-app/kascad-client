"use client";

import { Toaster } from "sonner";
import { Header } from "../header";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/shared/constants/ROUTES";
import BottomNav from "../../../app/components/BottomNav";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  return (
    <div>
      <Header />
      {children}
      <BottomNav />
      <Toaster position="top-right" richColors />
    </div>
  );
}

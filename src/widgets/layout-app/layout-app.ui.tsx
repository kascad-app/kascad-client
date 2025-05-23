"use client";

import { Navbar } from "@/shared/ui/navbar/navbar.ui";
import { Toaster } from "sonner";
import { Header } from "../header";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/shared/constants/ROUTES";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  const pathName = usePathname();
  const hideHeader: boolean = [
    ROUTES.AUTH.LOGIN,
    ROUTES.AUTH.REGISTER,
    ROUTES.LOADER,
  ].includes(pathName);

  return (
    <div className={hideHeader ? "" : "pt-[97px]"}>
      {!hideHeader && <Header />}
      {children}
      <Navbar />
      <Toaster position="top-right" richColors />
    </div>
  );
}

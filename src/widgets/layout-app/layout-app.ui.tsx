"use client";

import { Navbar } from "@/shared/ui/navbar/navbar.ui";
import { Toaster } from "sonner";
import { Header } from "../header";
import { usePathname } from "next/navigation";
import { ROUTES } from "@/shared/constants/ROUTES";
import { useSession } from "@/shared/context/SessionContext";

export default function LayoutApp({ children }: { children: React.ReactNode }) {
  const session = useSession();
  const pathName = usePathname();
  const hideComponents: boolean = [
    ROUTES.AUTH.LOGIN,
    ROUTES.AUTH.REGISTER,
    ROUTES.LOADER,
  ].includes(pathName);

  return (
    <div className={hideComponents ? "" : "pt-[97px]"}>
      {!hideComponents && <Header />}
      {children}
      {!hideComponents && <Navbar />}
      <Toaster position="top-right" richColors />
    </div>
  );
}

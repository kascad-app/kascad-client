import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/constants/ROUTES";
import { SWR_KEY } from "@/shared/constants/SWR_KEY";
import { Menu, User, Home, Settings, LogOut } from "lucide-react";
import { useLogout } from "@/entities/authentication/authentication.hooks";

export default function BottomNav() {
  const logout = useLogout();
  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md border border-black/10 px-4 py-2 rounded-full flex gap-2 md:gap-4 shadow-md z-50 items-center justify-between w-[95vw] md:w-auto ">
      <Link href="/home">
        <img className="h-8 md:h-10" src="/views/logos/logoSVG-blue.svg" alt="Logo" />
      </Link>
      <Link href={ROUTES.HOMEPAGE}>
        <Button variant="ghost" className="text-black text-xs md:text-sm px-2">
          <Home className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Accueil</span>
        </Button>
      </Link>
      <Link href={ROUTES.RIDER.PROFILE}>
        <Button variant="ghost" className="text-black text-xs md:text-sm px-2">
          <User className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Profil</span>
        </Button>
      </Link>
      <Link href={ROUTES.RIDER.EDIT_PROFILE}>
        <Button variant="ghost" className="text-black text-xs md:text-sm px-2">
          <Settings className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Paramètres</span>
        </Button>
      </Link>
      <Link href={ROUTES.AUTH.LOGIN}>
        <Button variant="ghost" className="text-black text-xs md:text-sm px-2" onClick={() => logout.trigger}>
          <LogOut className="w-4 h-4 md:mr-2" />
          <span className="hidden md:inline">Logout</span>
        </Button>
      </Link>
    </div>
  );
}

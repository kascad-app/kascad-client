import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/constants/ROUTES";
import { User, Home, Settings } from "lucide-react";
import { useLogout } from "@/entities/authentication/authentication.hooks";
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog";

export default function BottomNav() {
  const logoutMutation = useLogout();

  return (
    <div className="fixed bottom-4 left-1/2 -translate-x-1/2 bg-white/70 backdrop-blur-md border border-black/10 px-4 py-2 rounded-full flex gap-2 md:gap-4 shadow-md z-50 items-center justify-between w-[95vw] md:w-auto ">
      <Link href="/home">
        <img
          className="h-8 md:h-10"
          src="/views/logos/logoSVG-blue.svg"
          alt="Logo"
        />
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
      <AlertDialog>
        <AlertDialogTrigger asChild>
          <Button
            variant="ghost"
            className="text-sm text-red-500 hover:text-red-600 flex items-center justify-center flex-row gap-2"
          >
            <>
              <svg
                xmlns="http://www.w3.org/2000/svg"
                className="h-4 w-4"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a2 2 0 01-2 2H7a2 2 0 01-2-2V7a2 2 0 012-2h4a2 2 0 012 2v1"
                />
              </svg>
              Déconnexion
            </>
          </Button>
        </AlertDialogTrigger>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Vous nous quittez déjà ?</AlertDialogTitle>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Annuler</AlertDialogCancel>
            <AlertDialogAction onClick={() => logoutMutation.trigger()}>
              Se déconnecter
            </AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </div>
  );
}

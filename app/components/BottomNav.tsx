import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/constants/ROUTES";

export default function BottomNav() {
  return (
    <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-black px-6 py-2 rounded-full flex gap-4 shadow-md z-50">
<<<<<<< HEAD
      <Link href="/home">
        <img className="h-10" src="/views/logos/logoSVG-blue.svg" alt="" />
=======
      <Link href={ROUTES.HOMEPAGE}>
        <Button variant="ghost" className="text-black text-sm">
          Accueil
        </Button>
>>>>>>> abe66e93d60986e3acb884ee92d95b2a0cf25023
      </Link>
      <Link href={ROUTES.RIDER.PROFILE}>
        <Button variant="ghost" className="text-black text-sm">
          Mon profil
        </Button>
      </Link>
      <Link href={ROUTES.RIDER.EDIT_PROFILE}>
        <Button variant="ghost" className="text-black text-sm">
          Paramètres
        </Button>
      </Link>
    </div>
  );
}

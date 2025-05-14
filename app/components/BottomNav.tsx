import Link from "next/link";
import { Button } from "@/components/ui/button";

export default function BottomNav() {
    return (
        <div className="fixed bottom-6 left-1/2 -translate-x-1/2 bg-white border border-black px-6 py-2 rounded-full flex gap-4 shadow-md z-50">
            <Link href="/profil">
                <Button variant="ghost" className="text-black text-sm">Mon profil</Button>
            </Link>
            <Link href="/settings">
                <Button variant="ghost" className="text-black text-sm">Paramètres</Button>
            </Link>
        </div>
    );
}

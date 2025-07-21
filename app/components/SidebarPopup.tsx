import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogHeader,
  DialogTitle,
  DialogFooter,
  DialogClose,
} from "@/components/ui/dialog";
import { useSession } from "@/shared/context/SessionContext";
import { Language } from "@kascad-app/shared-types";

export function SidebarPopup({
  icon,
  label,
}: {
  icon: React.ReactNode;
  label: string;
}) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const session = useSession();

  const userLanguage: Language =
    (session.user && session.user?.preferences.appLanguage) ?? Language.FR;

  const toggleLanguage = () => {
    const newLang = userLanguage === Language.EN ? Language.FR : Language.EN;
    console.log(
      `Langue actuelle : ${userLanguage}, Nouvelle langue : ${newLang}`,
    );
  };

  return (
    <div>
      <Button
        variant="ghost"
        className="w-full justify-start text-sm flex items-center transition-colors bg-[#101b08] text-[#d2fa52] font-semibold text-white hover:bg-[#101b08]"
        onClick={() => setIsDialogOpen(true)}
      >
        <span className="mr-2 text-[#d2fa52] text-white">{icon}</span>
        {label}
      </Button>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>Paramètres de l'application</DialogTitle>
          </DialogHeader>
          <div className="space-y-4">
            <p className="text-sm text-gray-600">
              Voici les paramètres de l'application :
            </p>
            <div className="mt-4">
              <Button
                variant="outline"
                onClick={toggleLanguage}
                className="text-sm"
              >
                Changer la langue :{" "}
                {userLanguage === Language.EN ? "English" : "Français"}
              </Button>
            </div>
          </div>
          <DialogFooter>
            <Button variant="ghost" onClick={() => setIsDialogOpen(false)}>
              Fermer
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </div>
  );
}

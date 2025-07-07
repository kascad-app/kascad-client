import React, { useState } from "react";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogFooter } from "@/components/ui/dialog";
import Link from "next/link";
import { ROUTES } from "@/shared/constants/ROUTES";
import { useSession } from "@/shared/context/SessionContext";

export function SidebarPopup({ icon, label }: { icon: React.ReactNode; label: string }) {
    const [isDialogOpen, setIsDialogOpen] = useState(false);
    const session = useSession();
    const userLanguage = session.user?.preferences.appLanguage || "fr";

    return (
        <div>
            {/* Button to open the dialog */}
            <Button
                variant="ghost"
                className="w-full justify-start text-sm flex items-center transition-colors bg-[#101b08] text-[#d2fa52] font-semibold text-white hover:bg-[#101b08]"
                onClick={() => setIsDialogOpen(true)}
            >
                <span className="mr-2 text-[#d2fa52] text-white">{icon}</span>
                {label}
            </Button>

            {/* Dialog */}
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
                                onClick={() => {
                                    const newLang = userLanguage == "en" ? "fr" : "en";
                                    console.log(`Langue actuelle : ${userLanguage}, Nouvelle langue : ${newLang}`);
                                    // Logic to update the language in the session or backend
                                }}
                                className="text-sm"
                            >
                                Changer la langue : {userLanguage == "en" ? "English" : "Français"}
                            </Button>
                        </div>
                        <div className="mt-4">
                            <Link href={ROUTES.RIDER.PROFILE}>Édition Profile</Link>
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

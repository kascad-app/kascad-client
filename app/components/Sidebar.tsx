"use client";

import { ReactNode, useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import {
  Home,
  Settings,
  User,
  Users,
  Briefcase,
  ChevronLeft,
  ChevronRight,
  Menu,
  X,
  LetterText,
  MessageCircle,
} from "lucide-react";
import { Button } from "@/components/ui/button";
import { useLogout } from "@/entities/authentication/authentication.hooks";
import {
  AlertDialog,
  AlertDialogTrigger,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogFooter,
  AlertDialogCancel,
  AlertDialogAction,
} from "@/components/ui/alert-dialog";
import { ROUTES } from "@/shared/constants/ROUTES";
import { SidebarPopup } from "./SidebarPopup";

interface SidebarProps {
  children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
  const pathname = usePathname();
  const [isOpen, setIsOpen] = useState(true);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const logoutMutation = useLogout();

  const links = [
    {
      href: ROUTES.HOMEPAGE,
      label: "Accueil",
      icon: <Home className="w-4 h-4" />,
    },
    {
      href: ROUTES.RIDER.PROFILE,
      label: "Profil",
      icon: <User className="w-4 h-4" />,
    },
    {
      href: ROUTES.MESSAGERIE,
      label: "Messagerie",
      icon: <MessageCircle className="w-4 h-4" />,
    },
    {
      href: ROUTES.OFFRES,
      label: "Découvrir les offres",
      icon: <Briefcase className="w-4 h-4" />,
    },
    {
      href: ROUTES.SPONSORS.LIST,
      label: "Liste des sponsors",
      icon: <Users className="w-4 h-4" />, // Meilleur icône pour sponsors
    },
  ];

  return (
    <>
      {/* Desktop Sidebar */}
      <div className="hidden md:flex h-screen">
        <aside
          className={cn(
            "fixed top-0 left-0 z-40 h-full flex flex-col justify-between bg-[#3F4139] text-white border-r border-[#101B08] transition-all duration-300",
            isOpen ? "w-64 p-6" : "w-16 p-2",
          )}
        >
          <div
            className={cn(
              "flex flex-col items-start gap-12 mb-8",
              !isOpen && "items-center",
            )}
          >
            <div
              className={cn(
                "flex items-center w-full",
                isOpen ? "justify-between" : "flex-col items-center",
              )}
            >
              <Button
                variant="ghost"
                size="icon"
                onClick={() => setIsOpen(!isOpen)}
                className="bg-[#3F4139] text-primary-green hover:bg-[#101B08]"
              >
                {isOpen ? (
                  <ChevronLeft className="w-6 h-6" />
                ) : (
                  <ChevronRight className="w-6 h-6" />
                )}
              </Button>
              {isOpen && (
                <Link href={ROUTES.HOMEPAGE}>
                  <img
                    src="/views/logos/logoSVG-blue.svg"
                    alt="Logo"
                    className="h-8 ml-4"
                  />
                </Link>
              )}
              {!isOpen && (
                <Link href={ROUTES.HOMEPAGE}>
                  <img
                    src="/views/logos/logoSVG-blue.svg"
                    alt="Logo"
                    className="h-8 mt-4"
                  />
                </Link>
              )}
            </div>

            <nav className="space-y-2 w-full">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link key={link.href} href={link.href}>
                    <Button
                      variant="ghost"
                      className={cn(
                        "w-full justify-start text-sm flex items-center transition-colors",
                        active
                          ? "bg-[#101b08] text-primary-green font-semibold"
                          : "text-white hover:bg-[#101b08]",
                        // Ajout d'une transition pour le label
                        isOpen ? "duration-200" : "duration-200",
                      )}
                    >
                      <span
                        className={cn(
                          "mr-2",
                          active ? "text-primary-green" : "text-white",
                        )}
                      >
                        {link.icon}
                      </span>
                      <span
                        className={cn(
                          "transition-opacity duration-200",
                          isOpen
                            ? "opacity-100 ml-1"
                            : "opacity-0 ml-[-8px] pointer-events-none",
                        )}
                      >
                        {link.label}
                      </span>
                    </Button>
                  </Link>
                );
              })}
            </nav>
          </div>

          <div className="w-full mt-auto">
            <SidebarPopup
              icon={<Settings className="w-4 h-4" />}
              label={isOpen ? "Préférences" : ""}
            />
            <div className="pt-4 mt-4 border-t border-[#101B08]">
              <LogoutButton
                logout={() => logoutMutation.trigger()}
                isOpen={isOpen}
              />
            </div>
          </div>
        </aside>

        <main
          className={cn(
            "flex-1 transition-all duration-300 overflow-x-hidden w-full",
            isOpen ? "ml-64" : "ml-16",
          )}
        >
          {children}
        </main>
      </div>

      {/* Mobile Sidebar */}
      <div className="md:hidden">
        <Button
          variant="ghost"
          size="icon"
          onClick={() => setMobileMenuOpen(true)}
          className="fixed top-4 left-4 z-50 bg-[#3F4139] text-primary-green"
        >
          <Menu className="w-6 h-6" />
        </Button>

        {mobileMenuOpen && (
          <div className="fixed inset-0 z-50 bg-[#3F4139] text-white flex flex-col items-center justify-center p-8">
            <Button
              variant="ghost"
              size="icon"
              onClick={() => setMobileMenuOpen(false)}
              className="fixed top-4 right-4 text-primary-green"
            >
              <X className="w-6 h-6" />
            </Button>

            <nav className="flex flex-col gap-6 items-center">
              {links.map((link) => {
                const active = pathname === link.href;
                return (
                  <Link
                    key={link.href}
                    href={link.href}
                    onClick={() => setMobileMenuOpen(false)}
                  >
                    <span
                      className={cn(
                        "flex items-center gap-2 text-lg",
                        active ? "text-primary-green" : "text-white",
                      )}
                    >
                      {link.icon}
                      {link.label}
                    </span>
                  </Link>
                );
              })}
            </nav>

            {/* Optionnel : afficher SidebarPopup en mobile ? */}
            <div className="mt-6">
              <SidebarPopup
                icon={<Settings className="w-4 h-4" />}
                label="Préférences"
              />
            </div>

            <div className="mt-12">
              <LogoutButton
                logout={() => {
                  logoutMutation.trigger();
                  setMobileMenuOpen(false);
                }}
                isOpen={false}
              />
            </div>
          </div>
        )}

        <main>{children}</main>
      </div>
    </>
  );
}

function LogoutButton({
  logout,
  isOpen,
}: {
  logout: () => void;
  isOpen: boolean;
}) {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button
          variant="ghost"
          className="text-sm text-primary-green hover:text-primary-green flex items-center gap-2 w-full justify-start"
        >
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
          <span
            className={cn(
              "transition-opacity duration-200",
              isOpen
                ? "opacity-100 ml-1"
                : "opacity-0 ml-[-8px] pointer-events-none",
            )}
          >
            Déconnexion
          </span>
        </Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Vous nous quittez déjà ?</AlertDialogTitle>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Annuler</AlertDialogCancel>
          <AlertDialogAction onClick={logout}>Se déconnecter</AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  );
}

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
    X
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
    const [isOpen, setIsOpen] = useState(false);
    const logoutMutation = useLogout();

    return (
        <div className="flex h-screen">
            {/* Mobile menu button */}
            <div className="md:hidden fixed top-4 left-4 z-50">
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setIsOpen(true)}
                    className="bg-[#3F4139] text-[#D2FA52] hover:bg-[#101B08]"
                >
                    <Menu className="w-6 h-6" />
                </Button>
            </div>

            {/* Sidebar */}
            <aside
                className={cn(
                    "fixed top-0 left-0 z-40 h-full flex flex-col justify-between items-start bg-[#3F4139] text-white border-r border-[#101B08] transition-all duration-300",
                    isOpen ? "w-full md:w-64 p-6" : "w-0 md:w-64 p-0 md:p-4",
                    isOpen && "absolute"
                )}
            >
                <div className={cn("flex flex flex-col items-start justify-between gap-12 mb-8", !isOpen && "hidden md:flex")}>
                    <Link href="/home">
                        <img
                            src="/views/logos/logoSVG-blue.svg"
                            alt="Logo"
                            className="h-8"
                        />
                    </Link>
                    <button
                        onClick={() => setIsOpen(false)}
                        className="text-[#D2FA52] hover:text-white p-1 rounded transition md:hidden"
                    >
                        <X className="h-5 w-5" />
                    </button>
                    <nav className={cn("space-y-2", !isOpen && "hidden md:block")}>
                        <SidebarLink
                            href={ROUTES.HOMEPAGE}
                            icon={<Home className="w-4 h-4" />}
                            label="Accueil"
                            active={pathname === ROUTES.HOMEPAGE}
                        />
                        <SidebarLink
                            href={ROUTES.RIDER.PROFILE}
                            icon={<User className="w-4 h-4" />}
                            label="Profil"
                            active={pathname === ROUTES.RIDER.PROFILE}
                        />
                        <SidebarLink
                            href="/riders"
                            icon={<Users className="w-4 h-4" />}
                            label="Liste des riders"
                            active={pathname === "/riders"}
                        />
                        <SidebarLink
                            href="/sponsors"
                            icon={<Briefcase className="w-4 h-4" />}
                            label="Liste des sponsors"
                            active={pathname === "/sponsors"}
                        />
                    </nav>
                </div>


                <div className="w-full">
                    <SidebarPopup
                        icon={<Settings className="w-4 h-4" />}
                        label="Préferences"
                    />
                    <div className={cn("pt-4 mt-4 border-t border-[#101B08]", !isOpen && "hidden md:block")}>
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="text-sm text-[#D2FA52] hover:text-[#D2FA52] flex items-center gap-2 w-full justify-start"
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
                                    Déconnexion
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
                </div>
            </aside>

            {/* Main content */}
            <main
                className={cn(
                    "flex-1 transition-all duration-300 overflow-x-hidden w-full",
                    "pt-0 md:pt-0",
                    "md:ml-64"
                )}
            >
                {children}
            </main>
        </div>
    );
}

function SidebarLink({
    href,
    icon,
    label,
    active,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
}) {
    return (
        <Link href={href}>
            <Button
                variant="ghost"
                className={cn(
                    "w-full justify-start text-sm flex items-center transition-colors",
                    active
                        ? "bg-[#101b08] text-[#d2fa52] font-semibold"
                        : "text-white hover:bg-[#101b08]"
                )}
            >
                <span className={cn("mr-2", active ? "text-[#d2fa52]" : "text-white")}>{icon}</span>
                {label}
            </Button>
        </Link>
    );
}
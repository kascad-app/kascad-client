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

interface SidebarProps {
    children: ReactNode;
}

export default function Sidebar({ children }: SidebarProps) {
    const pathname = usePathname();
    const [isOpen, setIsOpen] = useState(true);
    const logoutMutation = useLogout();

    return (
        <div className="flex">
            {/* Sidebar */}
            <aside
                className={cn(
                    "h-screen transition-all duration-300 fixed top-0 left-0 z-50 p-4 flex flex-col justify-between",
                    isOpen ? "w-64" : "w-12",
                    "bg-[#3f4139] text-white border-r border-[#101B08]"
                )}
            >
                <div>
                    {/* Top section: logo + toggle button */}
                    <div className="flex items-center justify-between mb-8">
                        {isOpen ? (
                            <>
                                <Link href="/home">
                                    <img
                                        src="/views/logos/logoSVG-blue.svg"
                                        alt="Logo"
                                        className="h-8"
                                    />
                                </Link>
                                <button
                                    onClick={() => setIsOpen(false)}
                                    className="text-[#d2fa52] hover:text-white p-1 rounded transition"
                                >
                                    <ChevronLeft className="h-5 w-5" />
                                </button>
                            </>
                        ) : (
                            <button
                                onClick={() => setIsOpen(true)}
                                className="text-[#d2fa52] hover:text-white p-1 rounded transition mx-auto"
                            >
                                <ChevronRight className="h-5 w-5" />
                            </button>
                        )}
                    </div>

                    {/* Navigation */}
                    {isOpen && (
                        <nav className="space-y-2">
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
                                href={ROUTES.RIDER.EDIT_PROFILE}
                                icon={<Settings className="w-4 h-4" />}
                                label="Paramètres"
                                active={pathname === ROUTES.RIDER.EDIT_PROFILE}
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
                    )}
                </div>

                {/* Déconnexion */}
                {isOpen && (
                    <div className="pt-4 border-t border-[#101B08]">
                        <AlertDialog>
                            <AlertDialogTrigger asChild>
                                <Button
                                    variant="ghost"
                                    className="text-sm text-[#d2fa52] hover:text-[#d2fa52] flex items-center gap-2 w-full justify-start"
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
                )}
            </aside>

            {/* Main content */}
            <main
                className={cn(
                    "min-h-screen transition-all duration-300 p-6",
                    isOpen ? "ml-64 w-[calc(100%-16rem)]" : "ml-12 w-[calc(100%-3rem)]"
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
                <span className={cn("mr-2", active ? "text-[#d2fa52]" : "text-white")}>
                    {icon}
                </span>
                {label}
            </Button>
        </Link>
    );
}

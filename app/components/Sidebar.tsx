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
    X,
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
    const [isOpen, setIsOpen] = useState(true);
    const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
    const logoutMutation = useLogout();

    const links = [
        {
            href: ROUTES.HOMEPAGE,
            label: "Accueil",
            icon: <Home className="w-4 h-4" />,
            active: pathname === ROUTES.HOMEPAGE,
        },
        {
            href: ROUTES.RIDER.PROFILE,
            label: "Profil",
            icon: <User className="w-4 h-4" />,
            active: pathname === ROUTES.RIDER.PROFILE,
        },
        {
            href: ROUTES.RIDER.EDIT_PROFILE,
            label: "Paramètres",
            icon: <Settings className="w-4 h-4" />,
            active: pathname === ROUTES.RIDER.EDIT_PROFILE,
        },
        {
            href: "/riders",
            label: "Liste des riders",
            icon: <Users className="w-4 h-4" />,
            active: pathname === "/riders",
        },
        {
            href: "/sponsors",
            label: "Liste des sponsors",
            icon: <Briefcase className="w-4 h-4" />,
            active: pathname === "/sponsors",
        },
    ];

    return (
        <>
            {/* Desktop Sidebar */}
            <div className="hidden md:flex h-screen">
                <aside
                    className={cn(
                        "fixed top-0 left-0 z-40 h-full flex flex-col justify-between bg-[#3F4139] text-white border-r border-[#101B08] transition-all duration-300",
                        isOpen ? "w-64 p-6" : "w-16 p-2"
                    )}
                >
                    <div className={cn("flex flex-col items-start justify-between gap-12 mb-8", !isOpen && "items-center")}>
                        <div>
                            <Button
                                variant="ghost"
                                size="icon"
                                onClick={() => setIsOpen(!isOpen)}
                                className="bg-[#3F4139] text-[#D2FA52] hover:bg-[#101B08]"
                            >
                                {isOpen ? <ChevronLeft className="w-6 h-6" /> : <ChevronRight className="w-6 h-6" />}
                            </Button>
                            <Link href="/home">
                                <img
                                    src="/views/logos/logoSVG-blue.svg"
                                    alt="Logo"
                                    className="h-8 mt-4"
                                />
                            </Link>
                        </div>

                        <nav className="space-y-2 w-full">
                            {links.map((link) => (
                                <SidebarLink key={link.href} {...link} isOpen={isOpen} />
                            ))}
                        </nav>
                    </div>

                    {isOpen && (
                        <div className="pt-4 border-t border-[#101B08]">
                            <LogoutButton logout={() => logoutMutation.trigger()} />
                        </div>
                    )}
                </aside>

                <main className={cn("flex-1 transition-all duration-300 overflow-x-hidden w-full", isOpen ? "ml-64" : "ml-16")}>
                    {children}
                </main>
            </div>

            {/* Mobile Sidebar */}
            <div className="md:hidden">
                {/* Burger Button */}
                <Button
                    variant="ghost"
                    size="icon"
                    onClick={() => setMobileMenuOpen(true)}
                    className="fixed top-4 left-4 z-50 bg-[#3F4139] text-[#D2FA52]"
                    onClick={() => setMobileMenuOpen(true)}
                    className="fixed top-4 left-4 z-50 bg-[#3F4139] text-[#D2FA52]"
                >
                    <Menu className="w-6 h-6" />
                </Button>

                {/* Fullscreen Menu */}
                {mobileMenuOpen && (
                    <div className="fixed inset-0 z-50 bg-[#3F4139] text-white flex flex-col items-center justify-center p-8">
                        <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => setMobileMenuOpen(false)}
                            className="fixed top-4 right-4 text-[#D2FA52]"
                        >
                            <X className="w-6 h-6" />
                        </Button>

                        <nav className="flex flex-col gap-6 items-center">
                            {links.map((link) => (
                                <Link key={link.href} href={link.href} onClick={() => setMobileMenuOpen(false)}>
                                    <span className={cn(
                                        "flex items-center gap-2 text-lg",
                                        link.active ? "text-[#D2FA52]" : "text-white"
                                    )}>
                                        {link.icon}
                                        {link.label}
                                    </span>
                                </Link>
                            ))}
                        </nav>

                        <div className="mt-12">
                            <LogoutButton logout={() => {
                                setMobileMenuOpen(false);
                                logoutMutation.trigger();
                            }} />
                        </div>
                    </div>
                )}

                {/* Main content */}
                <main>{children}</main>
            </div>
        </>
    );
}

function SidebarLink({
    href,
    icon,
    label,
    active,
    isOpen,
}: {
    href: string;
    icon: React.ReactNode;
    label: string;
    active?: boolean;
    isOpen: boolean;
}) {
    return (
        <Link href={href} className="block">
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
                {isOpen && label}
            </Button>
        </Link>
    );
}

function LogoutButton({ logout }: { logout: () => void; }) {
    return (
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
                    <AlertDialogAction onClick={logout}>
                        Se déconnecter
                    </AlertDialogAction>
                </AlertDialogFooter>
            </AlertDialogContent>
        </AlertDialog>
    );
}

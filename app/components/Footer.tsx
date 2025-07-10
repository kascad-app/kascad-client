"use client";

import Link from "next/link";
import { Button } from "@/components/ui/button";
import { ROUTES } from "@/shared/constants/ROUTES";

export default function Footer() {
    return (
        <footer className="bg-[#F4F3EF] text-white px-6 py-12 md:px-16">
            <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-8 md:gap-16">
                {/* Bloc gauche : logo + slogan */}
                <div className="text-center md:text-left flex flex-col items-center md:items-start gap-2">
                    <img
                        src="/views/logos/logoSquare.svg"
                        alt="Kascad Logo"
                        className="h-10 mb-2"
                    />
                    <p className="text-sm text-black font-michroma">
                        La plateforme qui connecte les athlètes aux sponsors.
                    </p>
                </div>

                {/* Bloc central : liens */}
                <div className="flex flex-col md:flex-row gap-6 text-sm text-gray-300 items-center">
                    <Link href={ROUTES.RIDER.PROFILE} className="hover:text-white">
                        Mon profil
                    </Link>
                    <Link href={ROUTES.SPONSORS.LIST} className="hover:text-white">
                        Trouver un sponsor
                    </Link>
                    <Link href="/legal" className="hover:text-white">
                        Mentions légales
                    </Link>
                    <Link href="/contact" className="hover:text-white">
                        Contact
                    </Link>
                </div>

                {/* Bloc droit : CTA */}
                <div className="flex flex-col items-center md:items-end gap-2">
                    <p className="text-sm mb-2">Envie de rejoindre Kascad ?</p>
                    <Link href={ROUTES.AUTH.REGISTER}>
                        <Button className="bg-[#d2fa52] text-black font-semibold hover:bg-[#d9ff65]">
                            Créer un compte
                        </Button>
                    </Link>
                </div>
            </div>

            {/* Copyright */}
            <div className="text-xs text-gray-500 text-center mt-8 border-t border-gray-700 pt-4">
                © {new Date().getFullYear()} Kascad. Tous droits réservés.
            </div>
        </footer>
    );
}

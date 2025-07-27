"use client";

import { Button } from "@/components/ui/button";
import { Eye, MessageSquare } from "lucide-react";
import Link from "next/link";
import ArticleSlider from "@components/ui/articleSlider";
import { useSession } from "@/shared/context/SessionContext";
import { ROUTES } from "@/shared/constants/ROUTES";
import { GenderIdentity } from "@kascad-app/shared-types";
import { TestimonialsSection } from "../../components/TestimonialsSection";
import Footer from "../../components/Footer";
import { ViewDashboard } from "@/widgets/view-dashboard";
import { useGetTotalUnreadMessages } from "@/entities/direct-messages/conversations.hooks";

export default function Home() {
  const session = useSession();
  const { data: totalUnreadMessages } = useGetTotalUnreadMessages();

  return (
    <main className="min-h-screen bg-white text-white flex flex-col justify-between relative">
      {/* Hero section */}
      <section className="relative w-full h-[70vh] overflow-hidden bg-[#3f4139]">
        {/* Video en arrière-plan */}
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover min-w-full min-h-full"
        >
          <source src="/assets/videos/homeVid.mp4" type="video/mp4" />
        </video>

        {/* Overlay sombre */}
        <div className="absolute inset-0 bg-black/70" />

        {/* Contenu principal */}
        <div className="relative z-10 h-full w-full flex flex-col  items-center justify-center px-6 md:px-16 gap-10 text-white">
          {/* Partie gauche */}
          <div className=" flex flex-col items-center md:items-center text-center md:text-left gap-12">
            <h1 className="text-[8vw] md:text-5xl font-bold font-michroma text-center">
              Bonjour {session.user?.identity.firstName}, bienvenue sur Kascad
              👋
            </h1>
          </div>
          {/* 
          {/* Séparateur */}

          {/* Partie droite */}
          <div className=" flex flex-col items-center md:items-center text-left md:text-left gap-4">
            <h2 className="text-2xl md:text-3xl font-bold"></h2>
            <p className="text-center md:text-lg max-w-[500px]">
              Kascad est la plateforme qui connecte les athlètes aux sponsors.
              Mettez à jour votre profil, indiquez vos disponibilités, et
              laissez les marques venir à vous. Plus vous êtes actif, plus vous
              êtes visible.
            </p>
          </div>
          <Link href={ROUTES.RIDER.PROFILE}>
            <Button className="bg-transparent border-2 border-primary-green text-primary-green font-semibold hover:bg-primary-green hover:text-black p-4">
              Accéder à mon profil
            </Button>
          </Link>
        </div>
      </section>

      {/* Statistiques */}
      <section className="p-8 md:px-[12%] md:py-[7%] bg-white text-black flex flex-col gap-8 text-center md:text-start items-center justify-center">
        <p className="text-lg mb-6 w-full">
          <span className="text-3xl md:text-4xl block mb-4">
            {session.user?.identity.gender === GenderIdentity.FEMALE
              ? "Ne soyez plus seulement celle qui cherche, soyez aussi celle que l’on trouve."
              : "Ne soyez plus seulement celui qui cherche, soyez aussi celui que l’on trouve."}
          </span>
          Indiquez votre disponibilité et complétez votre profil pour que les
          sponsors qui recrutent vous contactent directement.
        </p>

        <div className="flex flex-col lg:flex-row w-full justify-start gap-12 md:gap-24 items-center">
          {/* Bloc profil */}
          <div className="rounded relative p-8 bg-[#3f4139] overflow-hidden w-full lg:w-1/2 text-white">
            <div className="flex flex-col gap-6 md:gap-12 max-w-full md:max-w-[60%] z-10 relative">
              <p className="text-center md:text-start">
                Accédez à votre profil et remplissez vos informations !
              </p>
              <Link href={ROUTES.RIDER.PROFILE} className="w-auto">
                <Button className="bg-primary-green text-black font-semibold hover:bg-[#d9ff65] px-6 min-w-fit">
                  Accéder à mon profil
                </Button>
              </Link>
            </div>
            <img
              className="grayscale absolute top-1/2 -translate-y-1/3 -right-[10%] w-auto h-[120%] z-0 opacity-30"
              src="/assets/img/moto-illu.png"
              alt=""
            />
          </div>

          {/* Bloc stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            {/* Colonne droite : dashboard */}
            <div className="w-full">
              <ViewDashboard views={session.user?.views.viewEntries} />
            </div>
            {/* Colonne gauche : messages reçus + vues du mois précédent */}
            <div className="flex flex-col justify-between gap-4 w-full">
              {/* Vues profil */}
              <div className="flex flex-col items-center md:items-start text-center p-6 gap-4 rounded-xl border w-full">
                <p className="text-md text-[#3f4139] font-semibold mb-4">
                  Vues du mois précédent
                </p>
                <div className="flex gap-6 md:gap-8 w-full justify-center md:justify-start items-center">
                  <Eye className="w-10 h-10 text-white bg-[#3f4139] rounded-md p-2" />
                  <p className="text-4xl text-[#3f4139] font-bold">
                    {session.user?.views.lastMonthViews || 0}
                  </p>
                </div>
              </div>
              {/* Messages reçus */}
              <div className="flex flex-col items-center md:items-start text-center p-6 gap-4 rounded-xl border w-full">
                <p className="text-md text-[#3f4139] font-semibold mb-4">
                  Messages reçus
                </p>
                <div className="flex gap-6 md:gap-8 w-full justify-center md:justify-start items-center">
                  <MessageSquare className="w-10 h-10 text-white bg-[#3f4139] rounded-md p-2" />
                  <p className="text-4xl text-[#3f4139] font-bold">
                    {totalUnreadMessages?.unreadCount || 0}
                  </p>
                </div>
                <Link href={ROUTES.MESSAGERIE} className="w-auto">
                  <Button
                    variant="outline"
                    className="border-[#3f4139] text-[#3f4139] hover:bg-[#3f4139] hover:text-white px-6 min-w-fit"
                  >
                    Ma messagerie
                  </Button>
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section
        className="relative w-full h-[60vh] bg-cover bg-center mb-8"
        style={{ backgroundImage: "url('/assets/img/ctaBG.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Trouve ton prochain sponsor dès aujourd’hui.
          </h2>
          <Link href={ROUTES.SPONSORS.LIST}>
            <Button className="bg-transparent border-2 border-primary-green text-primary-green font-semibold hover:bg-primary-green hover:text-black p-[1.5rem]">
              Rechercher des sponsors
            </Button>
          </Link>
        </div>
      </section>

      <section className="bg-white text-[#0A0B1E] py-12 px-6 text-center">
        <h2 className="text-3xl md:text-4xl font-bold mb-4">
          Explorez nos derniers articles
        </h2>
        <p className="text-base md:text-lg max-w-2xl mx-auto mb-10">
          Découvrez des conseils, témoignages, et actualités pour progresser
          dans votre discipline et mieux comprendre comment attirer des
          sponsors. Bonne lecture !
        </p>

        <ArticleSlider />
      </section>

      <TestimonialsSection />
      <Footer />
    </main>
  );
}

"use client";

import { Button } from "@/components/ui/button";
import { MessageSquare, ThumbsUp } from "lucide-react";
import Link from "next/link";
import BottomNav from "../components/BottomNav";
import ArticleSlider from "@components/ui/articleSlider";
import { useSession } from "@/shared/context/SessionContext";

export default function Home() {
  const session = useSession();

  return (
    <main className="min-h-screen bg-white text-black flex flex-col justify-between relative">
      {/* Hero section */}
      <section className="relative w-full h-[70vh] overflow-hidden">
        <video
          autoPlay
          muted
          loop
          playsInline
          className="absolute inset-0 w-full h-full object-cover"
        >
          <source src="/assets/videos/homeVid.mov" type="video/mp4" />
        </video>
        <div className="absolute inset-0 bg-black/70" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center gap-10 px-10 text-white">
          <h1 className="text-4xl md:text-5xl font-bold mb-4 font-michroma">
            Bonjour {session.user?.identity.firstName}👋
          </h1>
          {/* <p className="text-lg max-w-xl mb-6">
                        Ne soyez plus seulement celle qui cherche, soyez aussi celle que l’on trouve.
                    </p> */}
          <Link href="/profil">
            <Button className="bg-transparent border-white border-2 text-white font-semibold hover:bg-gray-100 hover:text-black p-6">
              Accéder à mon profil
            </Button>
          </Link>
        </div>
      </section>

      {/* Statistiques */}
      <section className="p-8 md:px-[12%] md:py-[7%] bg-white flex flex-col gap-8 text-center md:text-start items-center justify-center">
        <p className="text-lg mb-6 w-full">
          <span className="text-3xl md:text-4xl block mb-4">
            Ne soyez plus seulement celle qui cherche, soyez aussi celle que
            l’on trouve.
          </span>
          Indiquez votre disponibilité et complétez votre profil pour que les
          sponsors qui recrutent vous contactent directement.
        </p>

        <div className="flex flex-col lg:flex-row w-full justify-start gap-12 md:gap-24 items-center">
          {/* Bloc profil */}
          <div className="rounded relative p-8 bg-blue-200 overflow-hidden w-full lg:w-1/2">
            <div className="flex flex-col gap-6 md:gap-12 max-w-full md:max-w-[60%]">
              <p className="text-center md:text-start">
                Accéder à votre profil et rentrez vos informations !
              </p>
              <Link href="/profil">
                <Button className="bg-blue-700 text-white font-semibold hover:bg-blue-800 w-full z-4">
                  Accéder à mon profil
                </Button>
              </Link>
            </div>
            <img
              className="grayscale absolute top-1/2 -translate-y-1/3 -right-[10%] w-auto md:w-auto h-[120%] z-0"
              src="/assets/img/moto-illu.png"
              alt=""
            />
          </div>

          {/* Bloc stats */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 w-full">
            <div className="flex flex-col items-center md:items-start text-center p-6 gap-4 rounded-xl transition w-full border border-blue-700">
              <p className="text-md text-blue-700 mb-4">Messages reçus</p>
              <div className="flex gap-6 md:gap-8 w-full justify-center md:justify-start items-center">
                <MessageSquare className="w-10 h-10 text-white bg-blue-700 rounded-md p-2" />
                <p className="text-4xl text-blue-700 font-bold">23</p>
              </div>
              <Link href="/portfolio" className="w-1/2">
                <Button
                  variant="outline"
                  className="text-blue-700 bg-white text-white border-blue-700 hover:bg-blue-700 hover:text-white text-blue-700 w-full"
                >
                  ma messagerie
                </Button>
              </Link>
            </div>

            <div className="flex flex-col items-center md:items-start text-center p-6 gap-4 rounded-xl transition w-full border border-blue-700">
              <p className="text-md text-blue-700 mb-4">Vues sur mon profil</p>
              <div className="flex gap-6 md:gap-8 w-full justify-center md:justify-start items-center">
                <ThumbsUp className="w-10 h-10 text-white bg-blue-700 rounded-md p-2" />
                <p className="text-4xl font-bold text-blue-700">54</p>
              </div>
              <Link href="/portfolio" className="w-1/2">
                <Button
                  variant="outline"
                  className="text-blue-700 bg-white text-white border-blue-700 hover:bg-blue-700 hover:text-white text-blue-700 w-full"
                >
                  voir les vues
                </Button>
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Call to action */}
      <section
        className="relative w-full h-[60vh] bg-cover bg-center"
        style={{ backgroundImage: "url('/assets/img/ctaBG.webp')" }}
      >
        <div className="absolute inset-0 bg-black/40" />
        <div className="relative z-10 h-full flex flex-col justify-center items-center text-white text-center px-6">
          <h2 className="text-3xl md:text-4xl font-bold mb-8">
            Complétez votre profil pour apparaître dans les recherches
          </h2>
          <Link href="/profil">
            <Button className="bg-transparent border-white border-2 text-white font-semibold hover:bg-gray-100 hover:text-black p-6">
              Compléter mon profil
            </Button>
          </Link>
        </div>
      </section>

      <ArticleSlider />

      {/* Articles de blog
            <section className="py-12 px-6 bg-white">
                <h2 className="text-2xl font-bold mb-6">Derniers articles</h2>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {[1, 2, 3, 4].map((n) => (
                        <div
                            key={n}
                            className="min-w-[250px] bg-white rounded-xl border-gray-100 border overflow-hidden hover:shadow-md transition"
                        >
                            <img
                                src={`assets/img/blog-${n}.jpg`}
                                alt={`Article ${n}`}
                                className="w-full h-40 object-cover"
                            />
                            <div className="p-4">
                                <h3 className="text-lg font-semibold mb-2">Titre de l'article {n}</h3>
                                <p className="text-sm text-gray-600 line-clamp-3">
                                    Un aperçu du contenu de l'article numéro {n}. Voici quelques lignes intéressantes pour teaser la lecture...
                                </p>
                            </div>
                        </div>
                    ))}
                </div>
            </section> */}

      {/* Résultats de contest
            <section className="py-12 px-6 bg-gray-50">
                <h2 className="text-2xl font-bold mb-6">Résultats récents de contests</h2>
                <div className="flex gap-4 overflow-x-auto pb-4">
                    {[1, 2, 3, 4].map((n) => (
                        <div
                            key={n}
                            className="min-w-[200px] bg-white rounded-xl border border-gray-200 p-4 shadow-xs hover:shadow-md transition"
                        >
                            <h4 className="text-lg font-semibold mb-1">Contest #{n}</h4>
                            <p className="text-sm text-gray-500 mb-1">Date : 2025-03-0{n}</p>
                            <p className="text-sm text-black font-medium">Résultat : Top {n}</p>
                        </div>
                    ))}
                </div>
            </section> */}

      <BottomNav />
    </main>
  );
}

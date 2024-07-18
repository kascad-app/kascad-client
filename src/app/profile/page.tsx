"use client";
import { useEffect, useState } from "react";
import "./profile.css";
import List from "../components/liste";
import Layout from "@/app/components/Layout";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { usePathname } from "next/navigation";
import { Session } from "@/types/auth";
import useSession from "@hooks/use-session";
import { RiderIdentity } from "@kascad-app/shared-types";

gsap.registerPlugin(ScrollTrigger);

export default function ProfilePage() {
  const session: Session = useSession();
  const [loading, setLoading] = useState(0);
  const [resetting, setResetting] = useState(false);
  const userIdentity: RiderIdentity = session.user?.identity as RiderIdentity;
  const pathname = usePathname();

  const images = [
    "./views/profile/Carousel.png",
    "./views/profile/Carousel2.webp",
    "./views/profile/Carousel3.webp",
    "./views/profile/Carousel4.webp",
  ];

  useEffect(() => {
    let timer: NodeJS.Timeout;
    if (loading < images.length) {
      timer = setTimeout(() => {
        setLoading(loading + 1);
      }, 5000);
    } else {
      setResetting(true);
      setLoading(0);
    }

    return () => clearTimeout(timer);
  }, [loading]);

  useEffect(() => {
    if (resetting) {
      setTimeout(() => {
        setResetting(false);
      }, 100);
    }
  }, [loading, resetting]);

  const handleSpanClick = (index: number) => {
    setLoading(index); // Index is zero-based, so add 1 to match loading state
  };

  type ListItem = {
    id: number;
    date: string;
    event: string;
    categorie: string;
    top: string;
  };

  type Column<T> = {
    title: string;
    key: keyof T;
  };
  const firstListTitle: string = "Derniers résultat";
  const secondListTitle: string = "Classement général";

  const items: ListItem[] = [
    {
      id: 1,
      date: "21/11/2001",
      event: "Nike",
      categorie: "Running",
      top: "120",
    },
    {
      id: 2,
      date: "14/05/2004",
      event: "Adidas",
      categorie: "Football",
      top: "200",
    },
    {
      id: 3,
      date: "15/08/1971",
      event: "Puma",
      categorie: "Basketball",
      top: "150",
    },
  ];
  const columnTitles: Column<ListItem>[] = [
    {
      title: "Date",
      key: "date",
    },
    {
      title: "Evenements",
      key: "event",
    },
    {
      title: "Catégorie",
      key: "categorie",
    },
    {
      title: "Classement",
      key: "top",
    },
  ];

  return (
    <>
      {/* className="w-full h-96 flex items-center justify-center text-white
      text-4xl" */}
      <header className="w-full h-[65vh] bg-cover overflow-y-hidden relative image-gradient ">
        <div
          className="absolute inset-0 bg-cover filter grayscale"
          style={{ backgroundImage: `url(${images[loading]})` }}
        ></div>
        <div className="z-10 absolute inset-x-1/2 top-20 transform -translate-x-1/2 w-10/12 rounded-2xl font-bold px-8 py-12">
          <h1 className=" font-figtree text-8xl pb-5 text-black">
            {userIdentity.firstName}{" "}
            <span className="text-common-green">{userIdentity.lastName}</span>
          </h1>
          <p>@candide</p>
        </div>
        <div className="absolute z-10 bottom-10 inset-x-1/2 transform -translate-x-1/2 h-4 flex w-fit">
          {images.map((_, index) => (
            <span
              key={index}
              className="w-12 h-2 mx-2 rounded-full bg-white relative overflow-hidden cursor-pointer "
              onClick={() => handleSpanClick(index)}
            >
              <span
                className={`absolute top-0 left-0 h-full bg-common-green transition-all ${
                  resetting || index != loading
                    ? "duration-[0s]"
                    : "duration-[5s]"
                } ${
                  resetting
                    ? "w-0"
                    : loading > index
                    ? "w-full"
                    : loading === index
                    ? "w-full"
                    : "w-0"
                }`}
              ></span>
            </span>
          ))}
        </div>
      </header>
      <div
        id="sticky-nav"
        className="flex w-full h-fit justify-center gap-16 my-8 py-8 bg-white font-semibold sticky top-0"
      >
        <a href="#presentation" className="cursor-pointer scroll-smooth">
          PRESENTATION
        </a>
        <p>|</p>
        <a href="#stat" className="cursor-pointer">
          STATISTIQUE
        </a>
        <p>|</p>
        <a className="cursor-pointer">CONTENU</a>
      </div>
      <section
        id="presentation"
        className="scroll-smooth w-full min-h-screen bg-white flex flex-col items-center mb-16 font-semibold"
      >
        <div className="flex w-full h-full min-h-screen justify-center gap-x-32 items-center h-full pt-20">
          <div
            className="inset-0 bg-cover w-4/12 h-full "
            style={{
              backgroundImage: "url(./views/profile/profile.png)",
              height: "100vh",
            }}
          ></div>
          <div className="w-1/4">
            <h2 className="font-bold font-figtree text-5xl pb-12">ABOUT ME</h2>
            <p className="text-base font-thin">
              Skieur professionnel, freeskieur et snowboardeur, défie les
              conventions avec son style unique et ses exploits audacieux.
              <br />
              <br /> Sur les pentes, il repousse les limites de l'impossible,
              enchaînant figures acrobatiques et descentes périlleuses avec une
              grâce inégalée. Ses vidéos virales, capturant ses prouesses, ont
              fait de lui une icône des sports d'hiver. <br />
              <br />
              Son palmarès impressionnant témoigne de son talent et de sa
              détermination. Son engagement ne se limite pas au sport, il est
              également entrepreneur et créateur de contenu, partageant sa
              passion avec le monde entier.
              <br />
              <br /> Candid Thovex, un virtuose de la neige qui inspire et
              émerveille.
            </p>
          </div>
        </div>
      </section>
      <section
        id="stat"
        className="w-full h-screen bg-white flex flex-col   p-28 font-semibold"
      >
        <h2 className="font-bold font-figtree text-5xl">STATISTIQUES</h2>

        <List title={firstListTitle} items={items} columns={columnTitles} />
        <List title={secondListTitle} items={items} columns={columnTitles} />
        <Layout />
      </section>
    </>
  );
}

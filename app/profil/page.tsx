"use client";

import Image from "next/image";
import "./profile.css";
import Link from "next/link";
import { useState } from "react";
import ShapeCanvas from "./ShapeCanvas";
import { useSession } from "@/shared/context/SessionContext";
import { RiderIdentity } from "@kascad-app/shared-types";
import { Button } from "@/shared/ui/button/Button.ui";
import { ROUTES } from "@/shared/constants/ROUTES";

export default function ProfileComponent(): JSX.Element {
  const [visibleVideos, setVisibleVideos] = useState(4);
  const [visibleImages, setVisibleImages] = useState(4);
  const session = useSession();

  const Profile = {
    name:
      session.user != null
        ? (session.user.identity as RiderIdentity).fullName
        : "",
    sport: "BMX",
    bio:
      session.user?.description ??
      "Skieur professionnel, freeskieur et snowboardeur, défie les conventions avec son style unique et ses exploits audacieux. \n Sur les pentes, il repousse les limites de l'impossible, enchaînant figures acrobatiques et descentes périlleuses avec une grâce inégalée. Ses vidéos virales, capturant ses prouesses, ont fait de lui une icône des sports d'hiver. Son palmarès impressionnant témoigne de son talent et de sa détermination. Son engagement ne se limite pas au sport, il est également entrepreneur et créateur de contenu, partageant sa passion avec le monde entier. Candid Thovex, un virtuose de la neige qui inspire et émerveille.",
    stats: {
      age: {
        label: "ans",
        value:
          session.user?.identity != null &&
          (session.user?.identity as RiderIdentity).birthDate != null
            ? new Date().getFullYear() -
              new Date(
                (session.user?.identity as RiderIdentity).birthDate,
              ).getFullYear()
            : 0,
      },
    },
    location: "Paris, France",
    socials: {
      label: "Suivez-moi sur",
      links: {
        youtube: "https://www.youtube.com/",
        twitter: "https://x.com/",
        instagram: "https://www.instagram.com/",
      },
    },
    media: {
      videos: [
        "https://www.youtube.com/embed/y7nuxXCX97o",
        "https://www.youtube.com/embed/AFcTaLQ4bys",
        "https://www.youtube.com/embed/jPadxaRLGkw",
        "https://www.youtube.com/embed/8JGm6KJ-AWA",
        "https://www.youtube.com/embed/KWMerpf5c6Q",
        "https://www.youtube.com/embed/eB1e5MZ78b8",
        "https://www.youtube.com/embed/zZTx1F5X4S0",
        "https://www.youtube.com/embed/T7TYv1QGp7s",
      ],
      images: [
        "https://images.unsplash.com/photo-1542531365-8cedfed02b04?q=80&w=2477&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1563297592-fc163070b609?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1584890131712-18ee8e3ed49c?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "/views/profile/profile.png",
        "https://images.unsplash.com/photo-1549044759-bc149b504a80?q=80&w=2306&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1616431627899-191cffb5fd5c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1569135579442-d37b7a0ea74e?q=80&w=2050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1489228949628-35d7cf932bd1?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
    instagram: {
      username: "@marieclairekeno",
      description: [
        "Exploring the 🌎 from skiing's point of view🙏📹",
        "@dynafit📍Montana",
        "Let’s go to Japan!👇",
        "@freerideworldtour Champion 2020",
      ],
      posts: [
        "/views/profile/profile.png",
        "https://images.unsplash.com/photo-1542531365-8cedfed02b04?q=80&w=2477&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1563297592-fc163070b609?q=80&w=2565&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1584890131712-18ee8e3ed49c?q=80&w=2500&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1549044759-bc149b504a80?q=80&w=2306&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1616431627899-191cffb5fd5c?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1569135579442-d37b7a0ea74e?q=80&w=2050&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
        "https://images.unsplash.com/photo-1489228949628-35d7cf932bd1?q=80&w=2340&auto=format&fit=crop&ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
      ],
    },
  };

  const handleShowMoreVideos = () => {
    setVisibleVideos((prev) =>
      prev + 4 >= Profile.media.videos.length
        ? Profile.media.videos.length
        : prev + 4,
    );
    console.log(visibleVideos);
  };

  const handleResetVideos = () => {
    setVisibleVideos(4);
  };

  const handleShowMoreImages = () => {
    setVisibleImages((prev) =>
      prev + 4 >= Profile.media.images.length
        ? Profile.media.images.length
        : prev + 4,
    );
  };

  const handleResetImages = () => {
    setVisibleImages(4);
  };

  return (
    <div className="overflow-x-hidden">
      <div className="relative flex justify-center items-center flex-col w-screen h-[100dvh]">
        <div className="absolute top-5 right-5 flex flex-col gap-2">
          <Link href={ROUTES.RIDER.EDIT_PROFILE}>
            <Button>Modifier le profil</Button>
          </Link>
          <Button>Déconnexion</Button>
        </div>

        <ShapeCanvas className="absolute z-[-1] pointer-events-none filter blur-[20px]" />
        <p className="text-2xl leading-[30px] font-michroma">{Profile.sport}</p>
        <h1>
          {session.user != null && session.user.type === "rider"
            ? (session.user.identity as RiderIdentity).fullName
            : Profile.name}
        </h1>
      </div>
      <div className="flex mt-24 mx-auto max-w-[1200px]">
        <div className="profile_infos_image">
          <Image
            src={"/views/profile/profile.png"}
            alt={Profile.name ?? "Profile picture"}
            width={900}
            height={900}
          />
        </div>
        <div className="profile_infos_content">
          <p>{Profile.bio}</p>

          <div className="profile_infos_stats">
            {Object.entries(Profile.stats).map(([key, stat]) => (
              <div key={key}>
                <div>{stat.value}</div>
                <div className="label">{stat.label}</div>
              </div>
            ))}
          </div>

          <div className="profile_infos_loc">
            <span>{Profile.location}</span>
          </div>

          <div className="profile_infos_socials">
            <span className="label">{Profile.socials.label}</span>
            <div className="logos">
              <Link href={Profile.socials.links.youtube}>
                <img
                  src="/views/logos/facebook-circle-fill.svg"
                  alt="Facebook"
                  className="h-10 w-10"
                />
              </Link>
              <Link href={Profile.socials.links.twitter}>
                <img
                  src="/views/logos/twitter-x-line.svg"
                  alt="Twitter"
                  className="h-10 w-10"
                />
              </Link>
              <Link href={Profile.socials.links.instagram}>
                <img
                  src="/views/logos/instagram-line.svg"
                  alt="Instagram"
                  className="h-10 w-10"
                />
              </Link>
            </div>
          </div>
        </div>
      </div>

      <div className="profile_medias relative">
        <div className="mt-64">
          <h3 className="mb-10 text-4xl leading-[30px] font-[Michroma] text-white uppercase">
            Vidéos
          </h3>
          <div className="flex flex-wrap gap-6 w-full">
            {Profile.media.videos
              .slice(0, visibleVideos)
              .map((video, index) => (
                <iframe
                  key={index}
                  className="w-[calc(50%-12px)] rounded-[16px] object-cover aspect-[1.78]"
                  src={video}
                  title={`YouTube video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ))}
          </div>
          <div>
            {visibleVideos < Profile.media.videos.length ? (
              <button
                className="block mx-auto mt-12 px-4 py-2 bg-[#454545] text-white rounded-lg"
                onClick={handleShowMoreVideos}
              >
                Voir plus de vidéos
              </button>
            ) : (
              <button
                className="block mx-auto mt-12 px-4 py-2 bg-[#454545] text-white rounded-lg"
                onClick={handleResetVideos}
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>

        <div className="mt-64 ">
          <h3 className="mb-10 text-4xl leading-[30px] font-[Michroma] text-white uppercase">
            Images
          </h3>
          <div className="flex flex-wrap gap-6 w-full">
            {Profile.media.images
              .slice(0, visibleImages)
              .map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={300}
                  height={300}
                  className="w-[calc(50%-12px)] rounded-[16px] object-cover aspect-[0.94]"
                />
              ))}
          </div>
          <div>
            {visibleImages < Profile.media.images.length ? (
              <button
                className="block mx-auto mt-12 px-4 py-2 bg-[#454545] text-white rounded-lg"
                onClick={handleShowMoreImages}
              >
                Voir plus d'images
              </button>
            ) : (
              <button
                className="block mx-auto mt-12 px-4 py-2 bg-[#454545] text-white rounded-lg"
                onClick={handleResetImages}
              >
                Réinitialiser
              </button>
            )}
          </div>
        </div>

        <div className="mt-64">
          <div className="logo_insta"></div>
          <div className="mb-[18px] text-[32px] leading-[30px] font-michroma text-white text-center">
            {Profile.instagram.username}
          </div>
          <div className="mx-auto block text-white w-fit text-[16px] leading-[22px]">
            {Profile.instagram.description.map((desc, index) => (
              <p className="w-fit" key={index}>
                {desc}
              </p>
            ))}
          </div>
          <div className="flex mt-[42px] flex-wrap gap-[4px] max-w-[1200px] mx-auto">
            {Profile.instagram.posts.map((post, index) => (
              <Image
                key={index}
                src={post}
                alt={`Post Instagram ${index + 1}`}
                width={300}
                height={300}
                className="aspect-square w-[calc(25%-3px)]"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

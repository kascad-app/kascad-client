"use client";

import Image from "next/image";
import "./profile.css";
import Link from "next/link";
import { useState } from "react";
import ShapeCanvas from "./ShapeCanvas";
import useSession from "@/shared/api/use-session";
import { RiderIdentity } from "@kascad-app/shared-types";
import { Button } from "@/shared/ui/button/Button.ui";
import { DividerSvg } from "@/widgets/divider-svg";

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
    bio: session.user?.description ?? "Aucune description",
    stats: {
      age: { label: "ans", value: 19 },
      podiums: { label: "podiums", value: 5 },
      videos: { label: "vidéos", value: 16 },
      photos: { label: "photos", value: 16 },
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
    <div className="profile">
      <div className="profile_hero">
        <div className="absolute top-5 right-5 flex flex-col gap-2">
          <Link href="/profile/edit">
            <Button>Modifier le profil</Button>
          </Link>
          <Button>Déconnexion</Button>
        </div>

        <ShapeCanvas className="profile_hero_canva" />
        <p>{Profile.sport}</p>
        <h1>
          {session.user != null && session.user.type === "rider"
            ? (session.user.identity as RiderIdentity).fullName
            : Profile.name}
        </h1>
      </div>
      <div className="profile_infos">
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
          {/* {Profile.bio.map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))} */}

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
        <DividerSvg />

        <div className="profile_media">
          <h3 className="profile_media_title">Vidéos</h3>
          <div className="gallery">
            {Profile.media.videos
              .slice(0, visibleVideos)
              .map((video, index) => (
                <iframe
                  key={index}
                  width="560"
                  height="315"
                  src={video}
                  className="gallery_video"
                  title={`YouTube video ${index + 1}`}
                  frameBorder="0"
                  allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                  allowFullScreen
                ></iframe>
              ))}
          </div>
          <div className="gallery_buttons">
            {visibleVideos < Profile.media.videos.length ? (
              <button onClick={handleShowMoreVideos}>
                Voir plus de vidéos
              </button>
            ) : (
              <button onClick={handleResetVideos}>Réinitialiser</button>
            )}
          </div>
        </div>

        <div className="profile_media">
          <h3 className="profile_media_title">Images</h3>
          <div className="gallery">
            {Profile.media.images
              .slice(0, visibleImages)
              .map((image, index) => (
                <Image
                  key={index}
                  src={image}
                  alt={`Image ${index + 1}`}
                  width={300}
                  height={300}
                  className="gallery_image"
                />
              ))}
          </div>
          <div className="gallery_buttons">
            {visibleImages < Profile.media.images.length ? (
              <button onClick={handleShowMoreImages}>Voir plus d'images</button>
            ) : (
              <button onClick={handleResetImages}>Réinitialiser</button>
            )}
          </div>
        </div>

        <div className="profile_media">
          <div className="logo_insta"></div>
          <div className="profile_insta_name">{Profile.instagram.username}</div>
          <div className="profile_insta_desc">
            {Profile.instagram.description.map((desc, index) => (
              <p key={index}>{desc}</p>
            ))}
          </div>
          <div className="profile_insta_posts">
            {Profile.instagram.posts.map((post, index) => (
              <Image
                key={index}
                src={post}
                alt={`Post Instagram ${index + 1}`}
                width={300}
                height={300}
                className="insta_post"
              />
            ))}
          </div>
        </div>
      </div>
    </div>
  );
}

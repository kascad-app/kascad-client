"use client";

import Image from "next/image";
import { useEffect, useState } from "react";

interface InstagramPost {
  media_url: string;
  permalink: string;
  id: string;
}

interface InstagramProfile {
  username: string;
  biography: string;
  profile_picture_url?: string;
  posts: InstagramPost[];
}

export default function InstagramFeed() {
  const [profile, setProfile] = useState<InstagramProfile | null>(null);

  useEffect(() => {
    const fetchInstagram = async () => {
      try {
        const res = await fetch("/api/instagram-feed");
        const data = await res.json();
        setProfile(data);
      } catch (err) {
        console.error("Erreur récupération Instagram :", err);
      }
    };

    fetchInstagram();
  }, []);

  if (!profile) return <div className="text-white">Chargement...</div>;

  return (
    <div className="mt-64">
      <div className="mb-5 text-[32px] leading-[30px] font-michroma text-white text-center">
        @{profile.username}
      </div>
      <div className="mx-auto block text-white w-fit text-[16px] leading-[22px] text-center">
        <p>{profile.biography}</p>
      </div>
      <div className="flex mt-10 flex-wrap gap-[4px] max-w-[1200px] mx-auto">
        {profile.posts.map((post) => (
          <a href={post.permalink} target="_blank" rel="noopener noreferrer" key={post.id}>
            <Image
              src={post.media_url}
              alt={`Post Instagram`}
              width={300}
              height={300}
              className="aspect-square w-[calc(25%-3px)]"
            />
          </a>
        ))}
      </div>
    </div>
  );
}
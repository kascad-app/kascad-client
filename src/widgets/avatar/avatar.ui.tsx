import Image from "next/image";
import { AvatarProps, sizeConfig } from "./avatar.lib";
import { useState } from "react";
import { Skeleton } from "@components/ui/skeleton";

export default function Avatar({
  src,
  alt = "Photo de profil",
  size = "S",
  className = "",
}: AvatarProps) {
  const config = sizeConfig[size];
  const avatarSrc = src || "/assets/img/avatar/default-avatar.jpg";

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative"
      style={{ width: config.width, height: config.height }}
    >
      {!isLoaded && (
        <Skeleton className="absolute inset-0 w-full h-full rounded-full" />
      )}
      <Image
        src={avatarSrc}
        alt={alt}
        width={config.width}
        height={config.height}
        className={`rounded-full object-cover border ${
          config.className
        } ${className} transition-opacity duration-500 ${
          isLoaded ? "opacity-100" : "opacity-0"
        }`}
        onLoadingComplete={() => setIsLoaded(true)}
      />
    </div>
  );
}

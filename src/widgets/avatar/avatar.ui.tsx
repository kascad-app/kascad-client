import Image from "next/image";
import { AvatarProps, sizeConfig } from "./avatar.lib";
import { useState } from "react";

export default function Avatar({
  src,
  alt = "Photo de profil",
  size = "S",
  className = "",
}: AvatarProps) {
  const config = sizeConfig[size];
  const avatarSrc = src || "/assets/img/blog4.jpg";

  const [isLoaded, setIsLoaded] = useState(false);

  return (
    <div
      className="relative"
      style={{ width: config.width, height: config.height }}
    >
      {!isLoaded && (
        <div className="absolute inset-0">
          <div
            className={`w-full h-full rounded-full bg-gray-200 flex items-center justify-center`}
          >
            <span className="animate-pulse w-2/3 h-2/3 bg-gray-300 rounded-full" />
          </div>
        </div>
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

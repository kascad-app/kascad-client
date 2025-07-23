import Image from "next/image";
import { AvatarProps, sizeConfig } from "./avatar.lib";

export default function Avatar({
  src,
  alt = "Photo de profil",
  size = "S",
  className = "",
}: AvatarProps) {
  const config = sizeConfig[size];
  const avatarSrc = src || "/assets/img/blog4.jpg";

  return (
    <Image
      src={avatarSrc}
      alt={alt}
      width={config.width}
      height={config.height}
      className={`rounded-full object-cover border ${config.className} ${className}`}
    />
  );
}

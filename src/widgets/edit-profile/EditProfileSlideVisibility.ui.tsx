import { AuthenticationTypes } from "@/entities/authentication";
import { ProfileState } from "@/shared/types/profileSchema";
import { X } from "lucide-react";
import { useEffect, useState } from "react";
import ProfileImagesManager from "./ProfileImagesManager.ui";
import { ImageDto } from "@kascad-app/shared-types";
import { TempImage } from "../../../app/(protected)/profil/edit/page";

export default function EditProfileSlideVisibility({
  profile,
  setProfile,
  imageFiles,
  setImageFiles,
}: {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState | null>>;
  imageFiles: TempImage[];
  setImageFiles: React.Dispatch<React.SetStateAction<TempImage[]>>;
}) {
  const [currentImages, setCurrentImages] = useState<ImageDto[]>(
    (profile.images ?? []).map((img) => ({
      ...img,
      uploadDate:
        typeof img.uploadDate === "string"
          ? new Date(img.uploadDate)
          : img.uploadDate,
    })),
  );

  useEffect(() => {
    setProfile((prev) => (prev ? { ...prev, images: currentImages } : prev));
  }, [currentImages]);

  return (
    <ProfileImagesManager
      currentImages={currentImages}
      setCurrentImages={setCurrentImages}
      imageFiles={imageFiles}
      setImageFiles={setImageFiles}
    />
  );
}

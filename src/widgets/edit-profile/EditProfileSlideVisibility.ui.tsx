import { ProfileState } from "@/shared/types/profileSchema";
import { useEffect, useState } from "react";
import ProfileImagesManager from "./ProfileImagesManager.ui";
import ProfileVideosManager from "./ProfileVideosManager.ui";
import { ImageDto, OnlineVideo, TempImage } from "@kascad-app/shared-types";
import { Separator } from "@/components/ui/separator";

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

  const [currentVideos, setCurrentVideos] = useState<OnlineVideo[]>(
    profile.videos ?? [],
  );

  // Debug pour voir les vidéos du profil
  console.log("EditProfileSlideVisibility - profile.videos:", profile.videos);

  useEffect(() => {
    setProfile((prev) => (prev ? { ...prev, images: currentImages } : prev));
  }, [currentImages]);

  useEffect(() => {
    setProfile((prev) => (prev ? { ...prev, videos: currentVideos } : prev));
  }, [currentVideos]);

  return (
    <div className="space-y-8">
      <ProfileImagesManager
        currentImages={currentImages}
        setCurrentImages={setCurrentImages}
        imageFiles={imageFiles}
        setImageFiles={setImageFiles}
      />

      <Separator />

      <ProfileVideosManager
        currentVideos={currentVideos}
        setCurrentVideos={setCurrentVideos}
      />
    </div>
  );
}

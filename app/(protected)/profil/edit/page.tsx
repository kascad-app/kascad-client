"use client";

import { useEffect, useState } from "react";
import "./edit.css";

import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import {
  useUpdateInfo,
  useUploadAvatar,
  useUploadImages,
} from "@/entities/riders/riders.hooks";
import { useSession } from "@/shared/context/SessionContext";
import {
  Language,
  RiderIdentifier,
  RiderIdentity,
  Sport,
  TempImage,
} from "@kascad-app/shared-types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { ROUTES } from "@/shared/constants/ROUTES";
import EditProfileSlideAchievements from "@/widgets/edit-profile/EditProfileSlideAchievements.ui";
import EditProfileSlideVisibility from "@/widgets/edit-profile/EditProfileSlideVisibility.ui";
import {
  mapProfileToRawRider,
  profileSchema,
  ProfileState,
} from "@/shared/types/profileSchema";
import EditProfileSlideAbout from "@/widgets/edit-profile/EditProfileSlideAbout.ui";

export default function EditProfile() {
  const session = useSession();
  const router = useRouter();
  const updateRiderMutation = useUpdateInfo();
  const uploadAvatarMutation = useUploadAvatar();
  const uploadImagesMutation = useUploadImages();

  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [slide, setSlide] = useState(0);
  const [avatarPreview, setAvatarPreview] = useState<string | null>(
    session.user?.avatarUrl ?? null,
  );
  const [avatarFile, setAvatarFile] = useState<File | null>(null);
  const [isAvatarToReset, setIsAvatarToReset] = useState(false);
  const [imageFiles, setImageFiles] = useState<TempImage[]>([]);

  useEffect(() => {
    if (!session.user || profile) return;
    console.log(session.user);

    const identity = session.user.identity as RiderIdentity;
    const identifier = session.user.identifier as RiderIdentifier;

    const birthDate =
      identity.birthDate instanceof Date
        ? identity.birthDate.toISOString()
        : new Date(identity.birthDate).toISOString();

    setProfile({
      identity: {
        firstName: identity.firstName,
        lastName: identity.lastName,
        gender: identity.gender,
        birthDate,
        country: identity.country,
        city: identity.city,
        practiceLocation: identity.practiceLocation,
        languageSpoken: identity.languageSpoken,
      },
      email: session.user.identifier.email || "",
      address: "",
      phoneNumber: identifier.phoneNumber || "",
      bio: identity.bio || "",
      trainingFrequency: {
        sessionsPerWeek: session.user.trainingFrequency?.sessionsPerWeek || 1,
        hoursPerSession: session.user.trainingFrequency?.hoursPerSession || 1,
      },
      sponsors: session.user.sponsorSummary?.currentSponsors || [],
      events: [],
      videos: session.user.videos || [],
      images: (session.user.images || []).map((img) =>
        typeof img === "string"
          ? { url: img, uploadDate: new Date() }
          : {
              url: img.url,
              uploadDate: img.uploadDate ?? new Date(),
              alt: img.alt,
              isToDelete: false,
            },
      ),
      preferences: {
        networks: session.user.preferences?.networks || [],
        sports: session.user.preferences?.sports || [],
        appLanguage:
          Number(session.user.preferences?.appLanguage) || Language.FR,
      },
      performanceSummary: session.user.performanceSummary || null,
      availibility: {
        isAvailable:
          session.user.availibility &&
          typeof session.user.availibility.isAvailable !== "undefined"
            ? session.user.availibility.isAvailable
            : true,
        contractType:
          session.user.availibility &&
          typeof session.user.availibility.contractType !== "undefined"
            ? session.user.availibility.contractType
            : undefined,
      },
      sponsorsSummary: {
        totalSponsors: session.user.sponsorSummary?.totalSponsors || 0,
        currentSponsors: session.user.sponsorSummary?.currentSponsors || [],
        wishListSponsors: session.user.sponsorSummary?.wishListSponsors || [],
      },
    });

    if (!profile) return;
    const parse = profileSchema.safeParse(profile);
    if (!parse.success) {
      console.error("Erreur de validation des données:", parse.error);
      return;
    }
  }, [session.user]);

  async function handleSave() {
    if (!profile) return;
    try {
      const parsed = profileSchema.safeParse(profile);
      if (!parsed.success) {
        const details = parsed.error.errors
          .map((e) => `${e.path.join(".")} : ${e.message}`)
          .join(" | ");
        throw new Error(`Infos incomplètes ou incorrectes : ${details}`);
      }
      const riderPayload = mapProfileToRawRider(parsed.data);
      if (avatarFile) {
        const formData = new FormData();
        formData.append("file", avatarFile);
        await uploadAvatarMutation.trigger(formData);
      }
      if (isAvatarToReset) {
        // si l'image a été reset
        const formData = new FormData();
        formData.append("file", new Blob(), "kascadResetAvatar");
        await uploadAvatarMutation.trigger(formData);
      }
      if (imageFiles.length > 0) {
        const formData = new FormData();
        imageFiles.forEach((img) => {
          formData.append("files", img.file);
        });
        await uploadImagesMutation.trigger(formData);
      }
      await updateRiderMutation.trigger(riderPayload);
      toast.success("Profil mis à jour avec succès");
      router.push(ROUTES.RIDER.PROFILE);
    } catch (error: any) {
      console.error("Erreur lors de la sauvegarde du profil:", error);
    }
  }

  async function handleCancel() {
    if (
      confirm(
        "Êtes-vous sûr de vouloir annuler ? Toutes les modifications seront perdues.",
      )
    ) {
      router.push(ROUTES.RIDER.PROFILE);
    }
  }

  if (!profile) return <p className="p-6">Chargement du profil...</p>;

  const slideLabels = [
    "À propos",
    "Contenues et Visibilité",
    "Réalisations et Expériences",
  ];

  return (
    <div className="relative max-w-7xl mx-auto p-6 space-y-6 flex flex-col">
      <h2 className="text-2xl font-semibold">Modifier le profil</h2>
      <div className="flex justify-between border-b mb-6">
        {slideLabels.map((label, index) => (
          <button
            key={label}
            className={`pb-3 px-4 text-base font-medium border-b-2 transition-all duration-200 hover:text-accent ${
              slide === index
                ? "border-accent text-accent"
                : "border-transparent text-gray-600 hover:border-gray-300"
            }`}
            onClick={() => setSlide(index)}
          >
            {label}
          </button>
        ))}
      </div>

      {slide === 0 && (
        <EditProfileSlideAbout
          profile={profile}
          setProfile={setProfile}
          avatarPreview={avatarPreview}
          setAvatarFile={setAvatarFile}
          setAvatarPreview={setAvatarPreview}
          setIsAvatarToReset={setIsAvatarToReset}
        />
      )}
      {slide === 1 && (
        <EditProfileSlideVisibility
          profile={profile}
          setProfile={setProfile}
          imageFiles={imageFiles}
          setImageFiles={setImageFiles}
        />
      )}
      {slide === 2 && (
        <EditProfileSlideAchievements
          profile={profile}
          setProfile={setProfile}
        />
      )}

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" onClick={() => handleCancel()}>
          Annuler
        </Button>
        <Button
          disabled={updateRiderMutation.isMutating}
          onClick={async () => handleSave()}
        >
          Sauvegarder
        </Button>
      </div>
    </div>
  );
}

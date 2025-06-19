import { ProfileState } from "@/shared/types/profileSchema";

export default function EditProfileSlideAchievements({
  profile,
  setProfile,
}: {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState | null>>;
}) {
  return (
    <div className="flex flex-col gap-6">
      {/* Ajoute ici les champs liés aux réalisations, événements, etc. */}
    </div>
  );
}

import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileState } from "@/shared/types/profileSchema";
import { Button } from "@components/ui/button";
import { Textarea } from "@components/ui/textarea";
import { Language, SocialNetwork } from "@kascad-app/shared-types";
import Avatar from "../avatar/avatar.ui";

export default function EditProfileSlideAbout({
  profile,
  setProfile,
  avatarPreview,
  setAvatarFile,
  setAvatarPreview,
}: {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState | null>>;
  avatarPreview: string | null;
  setAvatarFile: (file: File | null) => void;
  setAvatarPreview: (url: string | null) => void;
}) {
  function handleAvatarReset() {
    setAvatarFile(null);
    setAvatarPreview(null);
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    const reader = new FileReader();
    reader.onloadend = () => setAvatarPreview(reader.result as string);
    reader.readAsDataURL(file);
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <label className="font-medium text-gray-700">Avatar</label>
        <div className="flex items-center gap-4">
          <Avatar src={avatarPreview} size="L" alt="Aperçu avatar"></Avatar>
          <div className="flex flex-col gap-2">
            <label
              htmlFor="avatar"
              className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition text-center"
            >
              Changer
              <input
                id="avatar"
                type="file"
                accept="image/*"
                className="hidden"
                onChange={handleAvatarChange}
              />
            </label>
            {avatarPreview && (
              <label className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-blue-700 transition text-center">
                Réinitialiser
                <Button
                  id="avatar"
                  className="hidden"
                  onClick={handleAvatarReset}
                />
              </label>
            )}
          </div>
        </div>
        <p className="text-xs text-gray-500">
          Formats acceptés : JPG, PNG Max : 10Mo.
        </p>
      </div>
      <div>
        <Label>Prénom</Label>
        <Input
          value={profile.firstName}
          onChange={(e) =>
            setProfile(
              (prev: ProfileState | null) =>
                prev && { ...prev, firstName: e.target.value },
            )
          }
        />
      </div>
      <div>
        <Label>Nom</Label>
        <Input
          value={profile.lastName}
          onChange={(e) =>
            setProfile(
              (prev: ProfileState | null) =>
                prev && { ...prev, lastName: e.target.value },
            )
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Email</label>
        <Input value={profile.email} disabled />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Numéro de téléphone
        </label>
        <Input
          type="tel"
          value={profile.phoneNumber ?? ""}
          onChange={(e) =>
            setProfile(
              (prev: ProfileState | null) =>
                prev && { ...prev, phoneNumber: e.target.value },
            )
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Pays</label>
        <Input
          value={profile.country}
          onChange={(e) =>
            setProfile(
              (prev: ProfileState | null) =>
                prev && { ...prev, country: e.target.value },
            )
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ville</label>
        <Input
          value={profile.city}
          onChange={(e) =>
            setProfile(
              (prev: ProfileState | null) =>
                prev && { ...prev, city: e.target.value },
            )
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Langue</label>
        <select
          className="w-full border rounded-md px-3 py-2"
          value={profile.preferences.appLanguage}
          onChange={(e) =>
            setProfile(
              (prev) =>
                prev && {
                  ...prev,
                  preferences: {
                    ...prev.preferences,
                    appLanguage: parseInt(e.target.value, 10) as Language,
                  },
                },
            )
          }
        >
          <option value={Language.FR}>Français</option>
          <option value={Language.EN}>Anglais</option>
        </select>
      </div>
      <div>
        <label className="block text-sm font-medium mb-1">
          Date de naissance
        </label>
        <Input
          type="date"
          value={profile.birthDate.slice(0, 10)} // ISO string -> 'YYYY-MM-DD'
          onChange={(e) =>
            setProfile((prev) =>
              prev ? { ...prev, birthDate: e.target.value } : prev,
            )
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Réseaux sociaux
        </label>
        <div className="flex flex-wrap gap-2">
          {Object.values(SocialNetwork).map((network) => {
            const isSelected = profile.preferences.networks.includes(network);
            return (
              <Button
                key={network}
                variant={isSelected ? "default" : "outline"}
                onClick={() => {
                  setProfile((prev) => {
                    if (!prev) return prev;
                    const updated = isSelected
                      ? prev.preferences.networks.filter((n) => n !== network)
                      : [...prev.preferences.networks, network];
                    return {
                      ...prev,
                      preferences: {
                        ...prev.preferences,
                        networks: updated,
                      },
                    };
                  });
                }}
              >
                {network.charAt(0).toUpperCase() + network.slice(1)}
              </Button>
            );
          })}
        </div>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Bio</label>
        <Textarea
          value={profile.bio}
          onChange={(e) =>
            setProfile((prev) => prev && { ...prev, bio: e.target.value })
          }
        />
      </div>
    </div>
  );
}

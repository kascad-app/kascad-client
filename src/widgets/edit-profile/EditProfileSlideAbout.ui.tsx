import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ProfileState } from "@/shared/types/profileSchema";
import { Button } from "@components/ui/button";
import { MultiSelect } from "@components/ui/custom-multiselect";
import { Textarea } from "@components/ui/textarea";
import {
  SocialNetwork,
  ContractType,
  SportName,
} from "@kascad-app/shared-types";
import Avatar from "../avatar/avatar.ui";
import { Calendar } from "@/components/ui/calendar";
import {
  Popover,
  PopoverTrigger,
  PopoverContent,
} from "@/components/ui/popover";
import { Switch } from "@/components/ui/switch";
import {
  Select,
  SelectTrigger,
  SelectContent,
  SelectItem,
  SelectValue,
} from "@/components/ui/select";

export default function EditProfileSlideAbout({
  profile,
  setProfile,
  avatarPreview,
  setAvatarFile,
  setAvatarPreview,
  setIsAvatarToReset,
}: {
  profile: ProfileState;
  setProfile: React.Dispatch<React.SetStateAction<ProfileState | null>>;
  avatarPreview: string | null;
  setAvatarFile: (file: File | null) => void;
  setAvatarPreview: (url: string | null) => void;
  setIsAvatarToReset: (reset: boolean) => void;
}) {
  function handleAvatarReset() {
    setAvatarFile(null);
    setAvatarPreview(null);
    setIsAvatarToReset(true);
  }

  function handleAvatarChange(e: React.ChangeEvent<HTMLInputElement>) {
    const file = e.target.files?.[0];
    if (!file) return;
    setAvatarFile(file);
    setIsAvatarToReset(false);
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
              className="cursor-pointer px-4 py-2 bg-blue-600 text-white rounded shadow hover:bg-accent transition text-center"
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
              <label className="cursor-pointer px-4 py-2 bg-[#3F4139] text-white rounded shadow hover:bg-accent transition text-center">
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
      {/* Disponibilité Toggle */}
      <div className="flex flex-col gap-2 w-full max-w-xs">
        <label className="font-medium text-gray-700">Disponible</label>
        <div className="flex items-center gap-4">
          <Switch
            checked={profile.availibility.isAvailable}
            onCheckedChange={(checked) =>
              setProfile((prev) =>
                prev
                  ? {
                      ...prev,
                      availibility: {
                        ...prev.availibility,
                        isAvailable: checked,
                        contractType: checked
                          ? prev.availibility.contractType
                          : ("Contrat UGC" as ContractType),
                      },
                    }
                  : prev,
              )
            }
          />
          <span className="text-sm text-gray-600">
            {profile.availibility.isAvailable
              ? "Disponible pour un contrat"
              : "Non disponible"}
          </span>
        </div>
        {/* Select ContratType si disponible */}
        {profile.availibility.isAvailable && (
          <div className="mt-2">
            <label className="block text-sm font-medium mb-1">
              Type de contrat
            </label>
            <Select
              value={profile.availibility.contractType ?? "Contrat UGC"}
              onValueChange={(value) => {
                console.log("Selected contract type:", value);
                setProfile((prev) => {
                  if (!prev) return prev;
                  // Correction : forcer la mise à jour même si la valeur est identique
                  return {
                    ...prev,
                    availibility: {
                      ...prev.availibility,
                      contractType: value as ContractType,
                    },
                  };
                });
              }}
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Choisir un type de contrat" />
              </SelectTrigger>
              <SelectContent>
                {Object.values(ContractType).map((type) => (
                  <SelectItem key={type} value={type}>
                    {type}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
        )}
      </div>
      <div>
        <Label>Prénom</Label>
        <Input
          value={profile.identity.firstName}
          onChange={(e) =>
            setProfile(
              (prev: ProfileState | null) =>
                prev && {
                  ...prev,
                  identity: { ...prev.identity, firstName: e.target.value },
                },
            )
          }
        />
      </div>
      <div>
        <Label>Nom</Label>
        <Input
          value={profile.identity.lastName}
          onChange={(e) =>
            setProfile(
              (prev: ProfileState | null) =>
                prev && {
                  ...prev,
                  identity: { ...prev.identity, lastName: e.target.value },
                },
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
          Date de naissance
        </label>
        <Popover>
          <PopoverTrigger asChild>
            <Button variant="outline" className="w-full justify-start">
              {profile.identity.birthDate
                ? new Date(profile.identity.birthDate).toLocaleDateString(
                    "fr-FR",
                  )
                : "Sélectionner une date"}
            </Button>
          </PopoverTrigger>
          <PopoverContent className="w-auto p-0">
            <Calendar
              mode="single"
              selected={
                profile.identity.birthDate
                  ? new Date(profile.identity.birthDate)
                  : undefined
              }
              defaultMonth={
                profile.identity.birthDate
                  ? new Date(profile.identity.birthDate)
                  : undefined
              }
              onSelect={(date) => {
                setProfile((prev) =>
                  prev
                    ? {
                        ...prev,
                        identity: {
                          ...prev.identity,
                          birthDate: date ? date.toISOString() : "",
                        },
                      }
                    : prev,
                );
              }}
              captionLayout="dropdown"
              fromYear={1950}
              toYear={new Date().getFullYear()}
              className="rounded-md border bg-white shadow-sm"
            />
          </PopoverContent>
        </Popover>
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
          value={profile.identity.country}
          onChange={(e) =>
            setProfile(
              (prev: ProfileState | null) =>
                prev && {
                  ...prev,
                  identity: { ...prev.identity, country: e.target.value },
                },
            )
          }
        />
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">Ville</label>
        <Input
          value={profile.identity.city}
          onChange={(e) =>
            setProfile(
              (prev: ProfileState | null) =>
                prev && {
                  ...prev,
                  identity: { ...prev.identity, city: e.target.value },
                },
            )
          }
        />
      </div>

      {/* Sélection des sports pratiqués avec MultiSelect */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Sports pratiqués
        </label>
        <MultiSelect
          options={Object.values(SportName).map((sport) => ({
            label: sport,
            value: sport,
          }))}
          selected={profile.preferences.sports.map((s) => s.name)}
          onChange={(selected: string[]) => {
            setProfile((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                preferences: {
                  ...prev.preferences,
                  sports: selected.map((name) => ({ name: name as SportName })),
                },
              };
            });
          }}
          placeholder="Sélectionner les sports pratiqués"
        />
        <p className="text-xs text-gray-500 mt-1">
          Sélectionnez vos sports dans la liste
        </p>
      </div>

      <div>
        <label className="block text-sm font-medium mb-1">
          Fréquence d'entraînement
        </label>
        <div className="flex flex-row gap-4 max-w-xs">
          <div className="flex-1">
            <label className="text-xs text-gray-700">Séances par semaine</label>
            <Input
              type="number"
              min={1}
              value={profile.trainingFrequency?.sessionsPerWeek ?? ""}
              onChange={(e) =>
                setProfile((prev) => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    trainingFrequency: {
                      ...prev.trainingFrequency,
                      sessionsPerWeek: Number(e.target.value),
                    },
                  };
                })
              }
            />
          </div>
          <div className="flex-1">
            <label className="text-xs text-gray-700">Heures par séance</label>
            <Input
              type="number"
              min={1}
              max={24}
              value={profile.trainingFrequency?.hoursPerSession ?? ""}
              onChange={(e) =>
                setProfile((prev) => {
                  if (!prev) return prev;
                  return {
                    ...prev,
                    trainingFrequency: {
                      ...prev.trainingFrequency,
                      hoursPerSession: Number(e.target.value),
                    },
                  };
                })
              }
            />
          </div>
        </div>
      </div>
      {/* Sélection des langues parlées avec MultiSelect */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Langues parlées
        </label>
        <MultiSelect
          options={[
            "Français",
            "Anglais",
            "Espagnol",
            "Allemand",
            "Italien",
            "Portugais",
            "Russe",
            "Chinois",
            "Japonais",
            "Arabe",
          ].map((lang) => ({ label: lang, value: lang }))}
          selected={profile.identity.languageSpoken}
          onChange={(selected: string[]) => {
            setProfile((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                identity: {
                  ...prev.identity,
                  languageSpoken: selected,
                },
              };
            });
          }}
          placeholder="Sélectionner les langues parlées"
        />
        <p className="text-xs text-gray-500 mt-1">
          Sélectionnez vos langues dans la liste
        </p>
      </div>
      {/* Sélection des réseaux sociaux avec MultiSelect */}
      <div>
        <label className="block text-sm font-medium mb-1">
          Réseaux sociaux
        </label>
        <MultiSelect
          options={Object.values(SocialNetwork).map((network) => ({
            label: network.charAt(0).toUpperCase() + network.slice(1),
            value: network,
          }))}
          selected={profile.preferences.networks}
          onChange={(selected: string[]) => {
            setProfile((prev) => {
              if (!prev) return prev;
              return {
                ...prev,
                preferences: {
                  ...prev.preferences,
                  networks: selected as SocialNetwork[],
                },
              };
            });
          }}
          placeholder="Sélectionner les réseaux sociaux"
        />
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
      <div>
        <label className="block text-sm font-medium mb-1">Sponsors</label>
        <div className="flex flex-col gap-2">
          {/* Sponsors actuels */}
          <div>
            <span className="text-xs text-gray-700 font-semibold">
              Sponsors actuels ({profile.sponsorsSummary.currentSponsors.length}
              )
            </span>
            {/* Champ d'ajout moderne */}
            <form
              className="flex gap-2 mt-1"
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem(
                  "currentSponsorInput",
                ) as HTMLInputElement;
                const value = input.value.trim();
                if (!value) return;
                setProfile((prev) => {
                  if (!prev) return prev;
                  if (prev.sponsorsSummary.currentSponsors.includes(value))
                    return prev;
                  const updated = [
                    ...prev.sponsorsSummary.currentSponsors,
                    value,
                  ];
                  return {
                    ...prev,
                    sponsorsSummary: {
                      ...prev.sponsorsSummary,
                      currentSponsors: updated,
                      totalSponsors: updated.length,
                    },
                  };
                });
                input.value = "";
              }}
            >
              <Input
                className="w-32"
                name="currentSponsorInput"
                placeholder="Ajouter..."
                autoComplete="off"
              />
              <Button type="submit" variant="outline" size="sm">
                Ajouter
              </Button>
            </form>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.sponsorsSummary.currentSponsors.map((sponsor) => (
                <Button
                  key={sponsor}
                  variant="default"
                  size="sm"
                  onClick={() => {
                    setProfile((prev) => {
                      if (!prev) return prev;
                      const updated =
                        prev.sponsorsSummary.currentSponsors.filter(
                          (s) => s !== sponsor,
                        );
                      return {
                        ...prev,
                        sponsorsSummary: {
                          ...prev.sponsorsSummary,
                          currentSponsors: updated,
                          totalSponsors: updated.length,
                        },
                      };
                    });
                  }}
                >
                  {sponsor} ✕
                </Button>
              ))}
            </div>
          </div>
          {/* Sponsors désirés */}
          <div className="mt-2">
            <span className="text-xs text-gray-700 font-semibold">
              Sponsors désirés
            </span>
            <form
              className="flex gap-2 mt-1"
              onSubmit={(e) => {
                e.preventDefault();
                const input = e.currentTarget.elements.namedItem(
                  "wishSponsorInput",
                ) as HTMLInputElement;
                const value = input.value.trim();
                if (!value) return;
                setProfile((prev) => {
                  if (!prev) return prev;
                  if (prev.sponsorsSummary.wishListSponsors.includes(value))
                    return prev;
                  return {
                    ...prev,
                    sponsorsSummary: {
                      ...prev.sponsorsSummary,
                      wishListSponsors: [
                        ...prev.sponsorsSummary.wishListSponsors,
                        value,
                      ],
                    },
                  };
                });
                input.value = "";
              }}
            >
              <Input
                className="w-32"
                name="wishSponsorInput"
                placeholder="Ajouter..."
                autoComplete="off"
              />
              <Button type="submit" variant="outline" size="sm">
                Ajouter
              </Button>
            </form>
            <div className="flex flex-wrap gap-2 mt-2">
              {profile.sponsorsSummary.wishListSponsors.map((sponsor) => (
                <Button
                  key={sponsor}
                  variant="outline"
                  size="sm"
                  onClick={() => {
                    setProfile((prev) => {
                      if (!prev) return prev;
                      return {
                        ...prev,
                        sponsorsSummary: {
                          ...prev.sponsorsSummary,
                          wishListSponsors:
                            prev.sponsorsSummary.wishListSponsors.filter(
                              (s) => s !== sponsor,
                            ),
                        },
                      };
                    });
                  }}
                >
                  {sponsor} ✕
                </Button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import "./edit.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateOne } from "@/entities/riders/riders.hooks";
import { useSession } from "@/shared/context/SessionContext";
import { ContractType, GenderIdentity, Language, Rider, RiderIdentifier, RiderIdentity, SocialNetwork, Sport } from "@kascad-app/shared-types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import slugify from "slugify";

const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  city: z.string(),
  country: z.string(),
  phoneNumber: z.string(),
  bio: z.string(),
  trainingFrequency: z.number().min(1),
  trainingUnit: z.enum(["week", "month"]),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Date invalide",
  }),
  gender: z.nativeEnum(GenderIdentity),
  sponsors: z.array(z.string()),
  events: z.array(
    z.object({
      name: z.string(),
      location: z.string(),
      date: z.string(),
      image: z.string(),
    }),
  ),
  videos: z.array(z.string()),
  images: z.array(z.string()),
  language: z.nativeEnum(Language),
  address: z.string(),

  spokenLanguages: z.array(z.nativeEnum(Language)),
  socialNetworks: z.array(z.nativeEnum(SocialNetwork)),
  practiceLocation: z.string(),
  sports: z.array(z.string()),
  isAvailable: z.boolean(),
});

type ProfileState = z.infer<typeof profileSchema>;

export default function EditProfile() {
  const session = useSession();
  const router = useRouter();
  const updateRiderMutation = useUpdateOne();
  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [slide, setSlide] = useState(0);
  const slideLabels = [
    "À propos",
    "Engagement et Visibilité",
    "Réalisations et Expériences",
  ];

  function stringToLanguage(value: string): Language {
    const intVal = parseInt(value, 10);
    if (intVal in Language) return intVal as Language;
    throw new Error("Langue inconnue : " + value);
  }

  useEffect(() => {
    if (!session.user) return;

    const identity = session.user.identity as RiderIdentity;
    const identifier = session.user.identifier as RiderIdentifier;

    const birthDate =
      identity.birthDate instanceof Date
        ? identity.birthDate.toISOString()
        : new Date(identity.birthDate).toISOString();

    const loadedProfile: ProfileState = {
      firstName: identity.firstName,
      lastName: identity.lastName,
      email: session.user.identifier.email || "",
      city: identity.city,
      address: "",
      country: identity.country,
      phoneNumber: identifier.phoneNumber || "",
      bio: identity.bio || "",
      trainingFrequency: session.user.trainingFrequency?.sessionsPerWeek || 3,
      trainingUnit: "week",
      birthDate,
      gender: identity.gender,
      sponsors: session.user.sponsorSummary?.currentSponsors || [],
      events: [],
      videos: [],
      images: (session.user.images || []).map((img) =>
        typeof img === "string" ? img : img.url,
      ),
      language: Number(session.user.preferences?.languages) ?? Language.FR,
      spokenLanguages: identity.languageSpoken.map(stringToLanguage),



      socialNetworks: session.user.preferences?.networks || [],
      practiceLocation: identity.practiceLocation,
      sports: session.user.preferences?.sports?.map((s: Sport) => s.name) || [],
      isAvailable: session.user.availibility?.isAvailable ?? true,
    };

    const parse = profileSchema.safeParse(loadedProfile);
    if (!parse.success) {
      console.error("Erreur de validation des données:", parse.error);
      return;
    }

    setProfile(loadedProfile);
  }, [session.user]);

  const mapProfileToRawRider = (profile: ProfileState): Partial<Rider> => {
    const fullName = `${profile.firstName} ${profile.lastName}`.trim();

    return {
      identifier: {
        email: profile.email,
        slug: slugify(fullName || profile.email, { lower: true }),
        phoneNumber: profile.phoneNumber,
        strava: { isLinked: false },
      },
      identity: {
        fullName,
        firstName: profile.firstName,
        lastName: profile.lastName,
        gender: profile.gender,

        birthDate: new Date(profile.birthDate),
        city: profile.city,
        country: profile.country,
        languageSpoken: profile.spokenLanguages.map((lang) => lang.toString()),
        practiceLocation: profile.practiceLocation,
        bio: profile.bio,
      },
      preferences: {
        networks: profile.socialNetworks,
        sports: profile.sports.map((name) => ({ name } as Sport)),
        languages: profile.language,
      },
      images: profile.images.map((url) => ({
        url,
        uploadDate: new Date(),
      })),
      availibility: {
        isAvailable: profile.isAvailable,
        contractType: ContractType.UGC, // valeur par défaut ou à configurer plus tard
      },
      trainingFrequency: {
        sessionsPerWeek: profile.trainingFrequency,
        hoursPerSession: 1, // valeur par défaut à ajuster
      },
    };
  };

  if (!profile) return <p className="p-6">Chargement du profil...</p>;

  return (
    <div className="relative max-w-7xl mx-auto p-6 space-y-6 w-[100vw] flex flex-col">
      <h2 className="text-2xl font-semibold">Modifier le profil</h2>
      <div className="flex justify-between border-b mb-6">
        {slideLabels.map((label, index) => (
          <button
            key={label}
            className={`pb-2 px-2 text-sm border-b-2 transition-colors ${slide === index
                ? "border-blue-500 text-blue-600"
                : "border-transparent text-gray-500"
              }`}
            onClick={() => setSlide(index)}
          >
            {label}
          </button>
        ))}
      </div>

      {slide === 0 && (
        <div className="flex flex-col gap-6">
          <div className="flex gap-4 w-full">
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Prénom</label>
              <Input
                value={profile.firstName}
                onChange={(e) =>
                  setProfile(
                    (prev) => prev && { ...prev, firstName: e.target.value },
                  )
                }
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Nom</label>
              <Input
                value={profile.lastName}
                onChange={(e) =>
                  setProfile(
                    (prev) => prev && { ...prev, lastName: e.target.value },
                  )
                }
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input value={profile.email} disabled />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Numéro de téléphone</label>
            <Input
              type="tel"
              value={profile.phoneNumber ?? ""}
              onChange={(e) =>
                setProfile((prev) => prev && { ...prev, phoneNumber: e.target.value })
              }
            />
          </div>

          {/* <div>
            <label className="block text-sm font-medium mb-1">Adresse</label>
            <Input
              value={profile.address}
              onChange={(e) =>
                setProfile(
                  (prev) => prev && { ...prev, address: e.target.value },
                )
              }
            />
          </div> */}

          <div>
            <label className="block text-sm font-medium mb-1">Pays</label>
            <Input
              value={profile.country}
              onChange={(e) =>
                setProfile((prev) => prev && { ...prev, country: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Ville</label>
            <Input
              value={profile.city}
              onChange={(e) =>
                setProfile((prev) => prev && { ...prev, city: e.target.value })
              }
            />
          </div>

          <div>
            <label className="block text-sm font-medium mb-1">Langue</label>
            <select
              className="w-full border rounded-md px-3 py-2"
              value={profile.language}
              onChange={(e) =>
                setProfile((prev) =>
                  prev && {
                    ...prev,
                    language: parseInt(e.target.value, 10) as Language,
                  }
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
                const isSelected = profile.socialNetworks.includes(network);
                return (
                  <Button
                    key={network}
                    variant={isSelected ? "default" : "outline"}
                    onClick={() => {
                      setProfile((prev) => {
                        if (!prev) return prev;
                        const updated = isSelected
                          ? prev.socialNetworks.filter((n) => n !== network)
                          : [...prev.socialNetworks, network];
                        return { ...prev, socialNetworks: updated };
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
      )}

      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" onClick={() => router.push("/profil")}>
          Annuler
        </Button>
        <Button
          onClick={async () => {
            try {
              const parsed = profileSchema.safeParse(profile);
              if (!parsed.success) throw new Error("Validation échouée");
              const rawRider = mapProfileToRawRider(parsed.data);
              console.log("Raw Rider Data:", rawRider);
              await updateRiderMutation.trigger(rawRider);
              toast.success("Profil mis à jour avec succès");
              router.push("/profil");
            } catch (error) {
              toast.error("Erreur : " + (error as Error).message);
            }
          }}
        >
          Sauvegarder
        </Button>
      </div>
    </div>
  );
}

"use client";

import { useEffect, useState } from "react";
import "./edit.css";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { useUpdateOne } from "@/entities/riders/riders.hooks";
import { useSession } from "@/shared/context/SessionContext";
import { GenderIdentity, Rider, RiderIdentity } from "@kascad-app/shared-types";
import { useRouter } from "next/navigation";
import { toast } from "sonner";
import { z } from "zod";
import slugify from "slugify";

interface Option {
  label: string;
  value: string;
}

const profileSchema = z.object({
  firstName: z.string().min(1),
  lastName: z.string().min(1),
  email: z.string().email(),
  address: z.string(),
  bio: z.string(),
  trainingFrequency: z.number().min(1),
  trainingUnit: z.enum(["week", "month"]),
  birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
    message: "Date invalide",
  }),
  gender: z.nativeEnum(GenderIdentity),
  sponsors: z.array(z.string()),
  events: z.array(z.object({
    name: z.string(),
    location: z.string(),
    date: z.string(),
    image: z.string(),
  })),
  videos: z.array(z.string()),
  images: z.array(z.string()),
});

type ProfileState = z.infer<typeof profileSchema>;

export default function EditProfile() {
  const session = useSession();
  const router = useRouter();
  const updateRiderMutation = useUpdateOne();

  const [profile, setProfile] = useState<ProfileState | null>(null);
  const [openDialog, setOpenDialog] = useState(false);
  const [slide, setSlide] = useState(0);

  useEffect(() => {
    if (!session.user) return;

    const identity = session.user.identity as RiderIdentity;

    const birthDate =
      identity?.birthDate instanceof Date
        ? identity.birthDate.toISOString()
        : typeof identity?.birthDate === "string"
          ? new Date(identity.birthDate).toISOString()
          : new Date().toISOString();


    const loadedProfile: ProfileState = {
      firstName: identity?.firstName || "Prénom",
      lastName: identity?.lastName || "Nom",
      email: session.user.identifier.email || "",
      address: identity?.city || "",
      bio: identity?.bio || "",
      trainingFrequency: 3,
      trainingUnit: "week",
      birthDate,
      gender: identity?.gender || GenderIdentity.MALE,
      sponsors: session.user.sponsorSummary?.currentSponsors || [],
      events: [],
      videos: [],
      images: session.user.images || [],
    };

    const parse = profileSchema.safeParse(loadedProfile);
    if (!parse.success) {
      console.error("Erreur de validation des données:", parse.error);
      return;
    }

    setProfile(loadedProfile);
  }, [session.user]);

  const trainingOptions: Option[] = [
    { label: "Par semaine", value: "week" },
    { label: "Par mois", value: "month" },
  ];

  const handleTrainingUnitChange = (value: string) => {
    if (!profile) return;
    setProfile((prev) =>
      prev
        ? {
          ...prev,
          trainingUnit: value as "week" | "month",
          trainingFrequency: Math.min(
            prev.trainingFrequency,
            value === "week" ? 7 : 30
          ),
        }
        : prev
    );
  };

  const maxFrequency = profile?.trainingUnit === "week" ? 7 : 30;
  const slides = [
    "À propos",
    "Engagement et Visibilité",
    "Réalisations et Expériences",
  ];

  function mapProfileToRawRider(profile: ProfileState): Partial<Rider> {
    const fullName = `${profile.firstName} ${profile.lastName}`.trim();

    return {
      identifier: {
        email: profile.email,
        slug: slugify(fullName || profile.email, { lower: true }),
      },
      identity: {
        fullName,
        firstName: profile.firstName,
        lastName: profile.lastName,
        gender: profile.gender,
        birthDate: new Date(profile.birthDate).getTime(),
        city: profile.address,
        country: "",
        languageSpoken: [],
        practiceLocation: "",
        bio: profile.bio,
      },
      currentSponsorSummary: {
        currentSponsors: profile.sponsors,
      },
      images: profile.images,
    };
  }

  if (!profile) return <p className="p-6">Chargement du profil...</p>;

  return (
    <div className="relative max-w-7xl mx-auto p-6 space-y-6 w-[100vw] flex flex-col">
      <h2 className="text-2xl font-semibold">Modifier le profil</h2>
      <div className="flex justify-between border-b mb-6">
        {slides.map((label, index) => (
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
                  setProfile((prev) => prev && { ...prev, firstName: e.target.value })
                }
              />
            </div>
            <div className="w-1/2">
              <label className="block text-sm font-medium mb-1">Nom</label>
              <Input
                value={profile.lastName}
                onChange={(e) =>
                  setProfile((prev) => prev && { ...prev, lastName: e.target.value })
                }
              />
            </div>
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Email</label>
            <Input value={profile.email} disabled />
          </div>
          <div>
            <label className="block text-sm font-medium mb-1">Adresse</label>
            <Input
              value={profile.address}
              onChange={(e) =>
                setProfile((prev) => prev && { ...prev, address: e.target.value })
              }
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
        </div>
      )}

      {/* BOUTONS ACTIONS */}
      <div className="flex justify-end gap-4 mt-8">
        <Button variant="outline" onClick={() => router.push("/profil")}>Annuler</Button>
        <Button
          onClick={async () => {
            try {
              const parsed = profileSchema.safeParse(profile);
              if (!parsed.success) throw new Error("Validation échouée");
              const rawRider = mapProfileToRawRider(parsed.data);
              await updateRiderMutation.trigger(rawRider);
              toast.success("Profil mis à jour avec succès");
              router.push("/profil");
            } catch (error) {
              toast.error("Erreur : " + (error as Error).message);
            }
          }}
        >Sauvegarder</Button>
      </div>
    </div>
  );
}
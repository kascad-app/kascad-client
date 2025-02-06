"use client";

import { useState } from "react";
import { Button } from "@/shared/ui/button/button";
import { Input } from "@/shared/ui/input/input";
import { Textarea } from "@/shared/ui/textarea/textarea";
import { Select } from "@/shared/ui/select";
import useSession from "@/shared/api/use-session";
import { updateProfile } from "@/entities/riders/riders.api";
import { useRouter } from "next/navigation";
import {
  AccountStatus,
  GenderIdentity,
  Language,
  ProfileRole,
  ProfileType,
  RiderIdentity,
} from "@kascad-app/shared-types";
import { toast } from "sonner";

interface Option {
  label: string;
  value: string;
}

export default function EditProfile() {
  const session = useSession();
  const router = useRouter();

  const [profile, setProfile] = useState({
    firstName:
      session.user != null
        ? (session.user?.identity as RiderIdentity).firstName
        : "",
    lastName:
      session.user != null
        ? (session.user?.identity as RiderIdentity).lastName
        : "",
    email: session.user?.identifier.email as string,
    address: "",
    description: "",
    trainingFrequency: 3,
    trainingUnit: "week",
    sponsors: ["RedBull", "Salomon", "Adidas"],
    events: [
      {
        name: "Redbull fest",
        location: "Montbéliard",
        date: "2016-01-04",
        image: "/views/profile/profile.png",
      },
      {
        name: "Redbull fest",
        location: "Montbéliard",
        date: "2016-01-04",
        image: "/views/profile/profile.png",
      },
      {
        name: "Redbull fest",
        location: "Montbéliard",
        date: "2016-01-04",
        image: "/views/profile/profile.png",
      },
      {
        name: "Redbull fest",
        location: "Montbéliard",
        date: "2016-01-04",
        image: "/views/profile/profile.png",
      },
      {
        name: "Redbull fest",
        location: "Montbéliard",
        date: "2016-01-04",
        image: "/views/profile/profile.png",
      },
      {
        name: "Redbull fest",
        location: "Montbéliard",
        date: "2016-01-04",
        image: "/views/profile/profile.png",
      },
      {
        name: "Redbull fest",
        location: "Montbéliard",
        date: "2016-01-04",
        image: "/views/profile/profile.png",
      },
      {
        name: "Redbull fest",
        location: "Montbéliard",
        date: "2016-01-04",
        image: "/views/profile/profile.png",
      },
    ],
    videos: Array(7).fill("https://www.youtube.com/embed/y7nuxXCX97o"),
    images: Array(11).fill("/views/profile/profile.png"),
  });

  const trainingOptions: Option[] = [
    { label: "Par semaine", value: "week" },
    { label: "Par mois", value: "month" },
  ];

  const handleSelectChange = (option: Option) => {
    setProfile((prev) => ({
      ...prev,
      trainingUnit: option.value,
      trainingFrequency:
        option.value === "week"
          ? Math.min(prev.trainingFrequency, 7)
          : Math.min(prev.trainingFrequency, 30),
    }));
  };

  const maxFrequency = profile.trainingUnit === "week" ? 7 : 30;

  // State to manage the active slide
  const [activeSlide, setActiveSlide] = useState(0);
  const slides = [
    "À propos",
    "Engagement et Visibilité",
    "Réalisations et Expériences",
  ];

  const firstName = String(profile.firstName ?? "");
  const lastName = String(profile.lastName ?? "");
  const email = String(profile.email ?? "");
  const address = String(profile.address ?? "");
  const description = String(profile.description ?? "");

  return (
    <div className="max-w-xl mx-auto p-6 space-y-3 min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-2xl font-semibold mb-16 w-full">
        Modifier le profil
      </h2>

      {/* Slide Navigation */}
      <div className="flex justify-between w-full mb-4 space-x-2">
        {slides.map((label, index) => (
          <span
            key={index}
            className={`text-sm py-2 cursor-pointer ${
              index === activeSlide ? "text-blue-500" : "text-gray-500"
            }`}
            onClick={() => setActiveSlide(index)}
          >
            {label}
          </span>
        ))}
      </div>

      {/* Slide Content */}
      <div className="w-full min-h-64">
        {/* Slide 1: À propos */}
        {activeSlide === 0 && (
          <div className="flex items-start flex-col">
            <div className="flex gap-4 w-full">
              <Input
                className="w-1/2"
                label="Prénom"
                value={firstName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProfile((prev) => ({
                    ...prev,
                    firstName: e.target.value,
                  }));
                }}
              />
              <Input
                className="w-1/2"
                label="Nom"
                value={lastName}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                  setProfile((prev) => ({
                    ...prev,
                    lastName: e.target.value,
                  }));
                }}
              />
            </div>
            <Input
              className="w-full mt-4"
              disabled={true}
              label="Email"
              value={email}
            />
            <Input
              className="w-full mt-8"
              label="Adresse postale"
              value={address}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => {
                setProfile((prev) => ({
                  ...prev,
                  address: e.target.value,
                }));
              }}
            />
            <Textarea
              className="w-full mt-12"
              label="Description"
              value={description}
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) => {
                return setProfile((prev) => ({
                  ...prev,
                  description: e.target.value,
                }));
              }}
            />
          </div>
        )}

        {/* Slide 2: Engagement et Visibilité */}
        {activeSlide === 1 && (
          <div className="flex items-start flex-col">
            <div className="flex items-center justidy-between gap-8 w-full">
              <div className="flex flex-col">
                <span className="text-sm font-light">
                  Fréquence d’entraînement
                </span>
                <Select
                  label="Fréquence d’entraînement"
                  options={trainingOptions}
                  onChange={handleSelectChange}
                />
              </div>
              <div className="flex flex-col">
                <Input
                  label=""
                  type="range"
                  value={String(profile.trainingFrequency)}
                  min={1}
                  max={maxFrequency}
                  step={1}
                  onChange={(e) =>
                    setProfile((prev) => ({
                      ...prev,
                      trainingFrequency: Number(e.target.value),
                    }))
                  }
                />
                <div className="text-sm text-gray-600">
                  {profile.trainingFrequency} entraînements{" "}
                  {profile.trainingUnit === "week" ? "par semaine" : "par mois"}
                </div>
              </div>
            </div>

            <div className="space-y-2 mt-12 w-full">
              <div className="flex justify-between items-center gap-8 w-full">
                <p className="font-light text-sm">Sponsors actuels</p>
                <Button size="small"> Ajouter + </Button>
              </div>
              <div className="flex gap-2">
                {profile.sponsors.map((sponsor) => (
                  <Button
                    delete={true}
                    variant="outline"
                    key={sponsor}
                    className="p-2 border rounded"
                  >
                    {sponsor}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Slide 3: Réalisations et Expériences */}
        {activeSlide === 2 && (
          <div className="flex items-start flex-col">
            <div className="w-full mt-8">
              <div className="flex justify-between items-center gap-8 w-full">
                <p className="font-light text-sm">Vos événements sportifs</p>
                <Button size="small"> Ajouter + </Button>
              </div>
              <div className="flex gap-4 overflow-x-auto whitespace-nowrap">
                {profile.events.map((event, index) => (
                  <div
                    key={index}
                    className="w-36 flex-shrink-0 flex flex-col gap-2 rounded mt-4"
                  >
                    <img
                      src={event.image}
                      alt={`Image ${index}`}
                      className="w-36 h-24 bg-gray-200 rounded object-cover"
                    />
                    <span className="w-fit text-sm/6">{event.date}</span>
                    <div className="flex flex-col">
                      <span className="w-fit">{event.name}</span>
                      <span className="w-fit">{event.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="w-full mt-12">
              <div className="flex justify-between items-center gap-8 w-full">
                <p className="font-light text-sm">Vos vidéos enregistrées</p>
                <Button size="small"> Ajouter + </Button>
              </div>
              <div className="flex no-wrap gap-2 overflow-x-scroll mt-6">
                {profile.videos.map((video, index) => (
                  <iframe
                    key={index}
                    width="300"
                    height="200"
                    src={video}
                    className="gallery_video"
                    title={`YouTube video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  ></iframe>
                ))}
              </div>
            </div>
            <div className="w-full mt-12">
              <div className="flex justify-between items-center gap-8 w-full">
                <p className="font-light text-sm">Vos images enregistrées</p>
                <Button size="small"> Ajouter + </Button>
              </div>
              <div className="flex no-wrap gap-2 overflow-x-scroll mt-6">
                {profile.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    className="w-30 h-40 bg-gray-200 rounded object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        )}
      </div>

      {/* Actions */}
      <div className="flex gap-4">
        <Button onClick={() => router.push("/profile")} variant="outline">
          Annuler
        </Button>
        <Button
          onClick={async () => {
            await updateProfile(session.user?._id as string, {
              identity: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                gender: GenderIdentity.MALE,
                birthDate: new Date(),
                fullName: `${profile.firstName} ${profile.lastName}`,
              },
              identifier: {
                email: profile.email,
              },
              description: profile.description,
              password: "",
              preferences: {
                sports: [],
                languages: Language.FR,
                networks: [],
              },
              partnerships: [],
              type: ProfileType.RIDER,
              role: ProfileRole.ADMIN,
              status: {
                status: AccountStatus.ACTIVE,
                reason: undefined,
                since: undefined,
                onboardingCompleted: false,
              },
              verified: false,
              isAvailable: false,
              _id: session.user?._id as string,
              createdAt: new Date(),
              updatedAt: new Date(),
            }).then(() => {
              console.log("Profile updated");
              toast.success("Profil mis à jour avec succès");
              router.push("/profile");
            });
          }}
        >
          Sauvegarder
        </Button>
      </div>
    </div>
  );
}

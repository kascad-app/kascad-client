"use client";

import { useState } from "react";
import "./edit.css";

import useSession from "@/shared/api/use-session";
import { updateProfile } from "@/entities/riders/riders.api";
import { useRouter } from "next/navigation";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Button } from "@/components/ui/button";
import {
  Select,
  SelectTrigger,
  SelectValue,
  SelectContent,
  SelectItem,
} from "@/components/ui/select";
import { toast } from "sonner";
import ShapeCanvas from "../ShapeCanvas";
import { RiderIdentity, GenderIdentity } from "@kascad-app/shared-types";
import { Dialog, DialogContent, DialogTrigger } from "@components/ui/dialog";
import EventUploader from "../../components/EventUploader";

interface Option {
  label: string;
  value: string;
}

export default function EditProfile() {
  const session = useSession();
  const [openDialog, setOpenDialog] = useState(false);
  const router = useRouter();
  const [date, setDate] = useState<Date>(
    (session.user?.identity as RiderIdentity)?.birthDate || new Date()
  );

  const [profile, setProfile] = useState({
    firstName: (session.user?.identity as RiderIdentity)?.firstName || "",
    lastName: (session.user?.identity as RiderIdentity)?.lastName || "",
    email: session.user?.identifier.email || "",
    address: "",
    description: session.user?.description || "",
    trainingFrequency: 3,
    trainingUnit: "week",
    birthDate: date,
    gender: (session.user?.identity as RiderIdentity)?.gender || GenderIdentity.MALE,
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

  const handleTrainingUnitChange = (value: string) => {
    setProfile((prev) => ({
      ...prev,
      trainingUnit: value,
      trainingFrequency: Math.min(prev.trainingFrequency, value === "week" ? 7 : 30),
    }));
  };

  const [newEvent, setNewEvent] = useState({
    name: "",
    location: "",
    date: "",
    image: "",
  });


  const maxFrequency = profile.trainingUnit === "week" ? 7 : 30;
  const slides = [
    "À propos",
    "Engagement et Visibilité",
    "Réalisations et Expériences",
  ];
  const [slide, setSlide] = useState(0);

  return (
    <div className="relative max-w-7xl mx-auto p-6 space-y-6  w-[100vw] flex flex-col">
      {/* <ShapeCanvas canvasHeight={700} canvasWidth={700} className="absolute pointer-events-none bottom-0 translate-y-1/2 left-8" /> */}
      <h2 className="text-2xl font-semibold">Modifier le profil</h2>

      {/* Slide Navigation */}
      <div className="flex justify-between border-b mb-6">
        {slides.map((label, index) => (
          <button
            key={label}
            className={`pb-2 px-2 text-sm border-b-2 transition-colors ${slide === index ? "border-blue-500 text-blue-600" : "border-transparent text-gray-500"
              }`}
            onClick={() => setSlide(index)}
          >
            {label}
          </button>
        ))}
      </div>

      {/* Slide Content */}
      <div className="w-full min-h-64">
        {/* Slide 1: À propos */}
        {slide === 0 && (
          <div className="flex flex-col gap-6">
            <div className="flex gap-4 w-full">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Prénom</label>
                <Input
                  value={profile.firstName}
                  onChange={(e) => setProfile((prev) => ({ ...prev, firstName: e.target.value }))}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Nom</label>
                <Input
                  value={profile.lastName}
                  onChange={(e) => setProfile((prev) => ({ ...prev, lastName: e.target.value }))}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Email</label>
              <Input value={profile.email} disabled />
            </div>

            <div className="flex gap-4 w-full">
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Adresse postale</label>
                <Input
                  value={profile.address}
                  onChange={(e) => setProfile((prev) => ({ ...prev, address: e.target.value }))}
                />
              </div>
              <div className="w-1/2">
                <label className="block text-sm font-medium mb-1">Date de naissance</label>
                <Input
                  type="date"
                  value={(() => {
                    try {
                      return profile.birthDate
                        ? new Date(profile.birthDate).toISOString().split("T")[0]
                        : new Date().toISOString().split("T")[0];
                    } catch {
                      return new Date().toISOString().split("T")[0];
                    }
                  })()}
                  onChange={(e) => {
                    const newDate = new Date(e.target.value);
                    setDate(newDate);
                    setProfile((prev) => ({ ...prev, birthDate: newDate }));
                  }}
                />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-1">Description</label>
              <Textarea
                value={profile.description}
                onChange={(e) => setProfile((prev) => ({ ...prev, description: e.target.value }))}
              />
            </div>
          </div>
        )}

        {/* Slide 2: Engagement et Visibilité */}
        {slide === 1 && (
          <div className="flex flex-col gap-6">
            {/* Fréquence d'entraînement */}
            <div className="w-full">
              <label className="text-sm font-medium mb-2 block">Fréquence d’entraînement</label>
              <div className="flex items-center gap-6">
                <div className="w-1/3">
                  <Select onValueChange={handleTrainingUnitChange} defaultValue={profile.trainingUnit}>
                    <SelectTrigger>
                      <SelectValue placeholder="Unité" />
                    </SelectTrigger>
                    <SelectContent>
                      {trainingOptions.map((opt) => (
                        <SelectItem key={opt.value} value={opt.value}>{opt.label}</SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </div>
                <div className="flex flex-col w-2/3">
                  <Input
                    type="range"
                    min={1}
                    max={maxFrequency}
                    value={profile.trainingFrequency}
                    onChange={(e) =>
                      setProfile((prev) => ({
                        ...prev,
                        trainingFrequency: Number(e.target.value),
                      }))
                    }
                  />
                  <span className="text-sm text-muted-foreground mt-2">
                    {profile.trainingFrequency} entraînements{" "}
                    {profile.trainingUnit === "week" ? "par semaine" : "par mois"}
                  </span>
                </div>
              </div>
            </div>

            {/* Sponsors actuels */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Sponsors actuels</p>
                <Button variant="outline" size="sm">Ajouter +</Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {profile.sponsors.map((sponsor) => (
                  <Button
                    variant="secondary"
                    key={sponsor}
                    className="px-3 py-1 text-sm rounded"
                  >
                    {sponsor}
                  </Button>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Slide 3: Réalisations et Expériences */}
        {slide === 2 && (

          <div className="flex flex-col gap-12">


            {/* Événements sportifs */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Vos événements sportifs</p>
                <EventUploader
                  mode="event"
                  trigger={<Button variant="outline" size="sm">Ajouter +</Button>}
                  onAdd={(newEvent) =>
                    setProfile((prev) => ({ ...prev, events: [...prev.events, newEvent] }))
                  }
                />

              </div>
              <div className="flex gap-4 overflow-x-auto whitespace-nowrap py-2">
                {profile.events.map((event, index) => (
                  <div
                    key={index}
                    className="w-36 flex-shrink-0 flex flex-col gap-2 rounded shadow-sm bg-white p-2 border"
                  >
                    <img
                      src={event.image}
                      alt={`Image ${index}`}
                      className="w-36 h-24 bg-gray-200 rounded object-cover"
                    />
                    <span className="text-xs text-muted-foreground">{event.date}</span>
                    <div className="flex flex-col text-sm">
                      <span>{event.name}</span>
                      <span className="text-muted-foreground">{event.location}</span>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Vidéos */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Vos vidéos enregistrées</p>
                <EventUploader
                  mode="video"
                  trigger={<Button variant="outline" size="sm">Ajouter +</Button>}
                  onAdd={(newVideoUrl) =>
                    setProfile((prev) => ({ ...prev, videos: [...prev.videos, newVideoUrl] }))
                  }
                />
              </div>
              <div className="flex gap-4 overflow-x-auto py-2">
                {profile.videos.map((video, index) => (
                  <iframe
                    key={index}
                    width="300"
                    height="200"
                    src={video}
                    className="rounded border"
                    title={`YouTube video ${index + 1}`}
                    allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture"
                    allowFullScreen
                  />
                ))}
              </div>
            </div>

            {/* Images */}
            <div className="w-full">
              <div className="flex justify-between items-center mb-2">
                <p className="text-sm font-medium">Vos images enregistrées</p>
                <EventUploader
                  mode="image"
                  trigger={<Button variant="outline">Ajouter une image</Button>}
                  onAdd={(url) => setProfile((prev) => ({ ...prev, images: [...prev.images, url] }))}
                />
              </div>
              <div className="flex gap-4 overflow-x-auto py-2">
                {profile.images.map((image, index) => (
                  <img
                    key={index}
                    src={image}
                    alt={`Image ${index}`}
                    className="w-32 h-44 bg-gray-200 rounded object-cover"
                  />
                ))}
              </div>
            </div>
          </div>
        )}

      </div>

      {/* Actions */}
      <div className="flex justify-end gap-4 mt-8">
        <Button
          variant="outline"
          onClick={() => router.push("/profile")}
        >
          Annuler
        </Button>
        <Button
          onClick={async () => {
            await updateProfile(session.user?._id as string, {
              identity: {
                firstName: profile.firstName,
                lastName: profile.lastName,
                gender: profile.gender,
                birthDate: profile.birthDate || new Date(),
                fullName: `${profile.firstName} ${profile.lastName}`,
              },
              description: profile.description,
            });
            toast.success("Profil mis à jour avec succès");
            router.push("/profile");
          }}
        >
          Sauvegarder
        </Button>
      </div>
    </div>
  );
}

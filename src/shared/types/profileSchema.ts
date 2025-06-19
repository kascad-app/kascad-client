import { z } from "zod";
import {
  ContractType,
  GenderIdentity,
  Language,
  SocialNetwork,
  Sport,
  updateRiderDto,
} from "@kascad-app/shared-types";

export const imageDtoSchema = z.object({
  url: z.string(),
  alt: z.string().optional(),
  isToDelete: z.boolean().optional(),
  uploadDate: z.union([z.string(), z.date()]),
});

export const profileSchema = z.object({
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
  images: z.array(imageDtoSchema),
  language: z.nativeEnum(Language),
  address: z.string(),

  spokenLanguages: z.array(z.nativeEnum(Language)),
  socialNetworks: z.array(z.nativeEnum(SocialNetwork)),
  practiceLocation: z.string(),
  sports: z.array(z.string()),
  isAvailable: z.boolean(),
});

export type ProfileState = z.infer<typeof profileSchema>;

export const mapProfileToRawRider = (
  profile: ProfileState,
): Partial<updateRiderDto> => {
  const fullName = `${profile.firstName} ${profile.lastName}`.trim();

  return {
    identifier: {
      phoneNumber: profile.phoneNumber,
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
    images: profile.images.map((img) => ({
      url: img.url,
      alt: img.alt,
      isToDelete: img.isToDelete,
      uploadDate:
        typeof img.uploadDate === "string"
          ? new Date(img.uploadDate)
          : img.uploadDate,
    })),
    availibility: {
      isAvailable: profile.isAvailable,
      contractType: ContractType.UGC, // valeur par défaut ou à configurer plus tard
    },
    trainingFrequency: {
      sessionsPerWeek: profile.trainingFrequency,
      hoursPerSession: 1, // valeur par défaut à ajuster
    },
    description: profile.bio,
  };
};

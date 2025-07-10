import { z } from "zod";
import {
  ContractType,
  GenderIdentity,
  Language,
  SocialNetwork,
  SportName,
  updateRiderDto,
  WeatherCondition,
} from "@kascad-app/shared-types";

export const imageDtoSchema = z.object({
  url: z.string(),
  alt: z.string().optional(),
  isToDelete: z.boolean().optional(),
  uploadDate: z.union([z.string(), z.date()]),
});

export const videoDtoSchema = z.object({
  url: z.string(),
  title: z.string(),
  description: z.string().optional(),
});

export const sportTypeSchema = z.object({
  name: z.nativeEnum(SportName),
  description: z.string().optional(),
});

export const profileSchema = z.object({
  identity: z.object({
    firstName: z.string().min(1),
    lastName: z.string().min(1),
    gender: z.nativeEnum(GenderIdentity),
    birthDate: z.string().refine((val) => !isNaN(Date.parse(val)), {
      message: "Date invalide",
    }),
    country: z.string(),
    city: z.string(),
    practiceLocation: z.string(),
    languageSpoken: z.array(z.string()),
  }),
  email: z.string().email(),
  phoneNumber: z.string(),
  bio: z.string(),
  sponsors: z.array(z.string()),
  events: z.array(
    z.object({
      name: z.string(),
      location: z.string(),
      date: z.string(),
      image: z.string(),
    }),
  ),
  videos: z.array(videoDtoSchema),
  images: z.array(imageDtoSchema),
  address: z.string(),
  preferences: z.object({
    networks: z.array(z.nativeEnum(SocialNetwork)),
    sports: z.array(sportTypeSchema),
    appLanguage: z.nativeEnum(Language),
  }),
  performanceSummary: z.object({
    totalPodiums: z.number(),
    performances: z.array(
      z.object({
        startDate: z.union([z.string(), z.date()]),
        endDate: z.union([z.string(), z.date()]),
        eventName: z.string(),
        category: z.string(),
        sport: sportTypeSchema,
        ranking: z.number().optional(),
        location: z.object({
          country: z.string(),
          city: z.string(),
        }),
        weather: z.nativeEnum(WeatherCondition).optional(),
        notes: z.string().optional(),
      }),
    ),
  }),
  trainingFrequency: z.object({
    sessionsPerWeek: z.number().min(1),
    hoursPerSession: z.number().min(1).max(24),
  }),
  sponsorsSummary: z.object({
    totalSponsors: z.number(),
    currentSponsors: z.array(z.string()),
    wishListSponsors: z.array(z.string()),
  }),
  availibility: z.object({
    isAvailable: z.boolean(),
    contractType: z.nativeEnum(ContractType).optional(),
  }),
});

export type ProfileState = z.infer<typeof profileSchema>;

export const mapProfileToRawRider = (
  profile: ProfileState,
): Partial<updateRiderDto> => {
  const fullName =
    `${profile.identity.firstName} ${profile.identity.lastName}`.trim();

  return {
    identifier: {
      phoneNumber: profile.phoneNumber,
    },
    identity: {
      fullName,
      firstName: profile.identity.firstName,
      lastName: profile.identity.lastName,
      gender: profile.identity.gender,

      birthDate: new Date(profile.identity.birthDate),
      city: profile.identity.city,
      country: profile.identity.country,
      languageSpoken: profile.identity.languageSpoken,
      practiceLocation: profile.identity.practiceLocation,
      bio: profile.bio,
    },
    preferences: {
      networks: profile.preferences.networks,
      sports: profile.preferences.sports,
      appLanguage: profile.preferences.appLanguage,
    },
    performanceSummary: {
      totalPodiums: profile.performanceSummary.totalPodiums,
      performances: profile.performanceSummary.performances.map((perf) => ({
        startDate:
          typeof perf.startDate === "string"
            ? new Date(perf.startDate)
            : perf.startDate,
        endDate:
          typeof perf.endDate === "string"
            ? new Date(perf.endDate)
            : perf.endDate,
        eventName: perf.eventName,
        category: perf.category,
        sport: perf.sport,
        ranking: perf.ranking,
        location: {
          country: perf.location.country,
          city: perf.location.city,
        },
        weather: perf.weather,
        notes: perf.notes,
      })),
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
    videos: profile.videos.map((video) => ({
      url: video.url,
      title: video.title,
      description: video.description,
    })),
    availibility: {
      isAvailable: profile.availibility.isAvailable,
      contractType: profile.availibility.contractType as ContractType,
    },
    trainingFrequency: {
      sessionsPerWeek: profile.trainingFrequency.sessionsPerWeek,
      hoursPerSession: profile.trainingFrequency.hoursPerSession, // valeur par défaut à ajuster
    },
    sponsorSummary: {
      totalSponsors: profile.sponsorsSummary.totalSponsors,
      currentSponsors: profile.sponsorsSummary.currentSponsors,
      wishListSponsors: profile.sponsorsSummary.wishListSponsors,
    },
    description: profile.bio,
  };
};
